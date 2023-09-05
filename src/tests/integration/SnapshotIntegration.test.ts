import { Equipment } from '../../models/Equipment';
import { SnapshotService } from '../../services/SnapshotService';
import * as fs from 'fs';
import * as path from 'path';

describe('SnapshotService Integration Tests', () => {
    let snapshotService: SnapshotService;
    const repoPath = path.resolve(__dirname, '/mockrepo');

    beforeAll(async () => {
        // Initialize SnapshotService
        snapshotService = new SnapshotService(repoPath);
        await snapshotService.initGitRepo();
    });

    // Existing tests...

    it('should correctly delete a snapshot', async () => {
        const equipment = new Equipment('Server');
        await snapshotService.createSnapshot(equipment, 'snapshot_to_delete.json', 'Create for deletion');

        // Delete the snapshot
        await snapshotService.deleteSnapshot('snapshot_to_delete.json', 'Deleted snapshot');

        // Check if the file is actually deleted
        const filePath = path.join(repoPath, 'snapshot_to_delete.json');
        expect(fs.existsSync(filePath)).toBe(false);
    });

    it('should correctly modify a snapshot', async () => {
        const equipment = new Equipment('Server');
        await snapshotService.createSnapshot(equipment, 'snapshot_to_modify.json', 'Create for modification');

        // Modify the snapshot
        equipment.addChild(new Equipment('Network Card'));
        await snapshotService.modifySnapshot(equipment, 'snapshot_to_modify.json', 'Modified snapshot');

        // Load and check the modified snapshot
        const modifiedSnapshot = snapshotService.loadSnapshot('snapshot_to_modify.json');
        expect(modifiedSnapshot.equipment.children).toHaveLength(1);  // Assuming equipment is a public field
    });

    it('should correctly compare two identical snapshots', async () => {
        const snapshot1 = snapshotService.loadSnapshot('snapshot1.json');
        const snapshot2 = snapshotService.loadSnapshot('snapshot2.json');

        console.log("Comparing snapshots:", snapshot1, snapshot2);  // Debug line

        const areIdentical = snapshotService.compareSnapshots('snapshot1.json', 'snapshot2.json');
        expect(areIdentical).toBe(true);
    });

    it('should correctly rollback to a previous snapshot', async () => {
        const equipment = new Equipment('Server');
        await snapshotService.createSnapshot(equipment, 'snapshot_to_rollback.json', 'Create for rollback');

        // Modify the current equipment
        equipment.addChild(new Equipment('Network Card'));

        // Rollback to the previous snapshot
        await snapshotService.rollbackToSnapshot('snapshot_to_rollback.json', equipment);

        console.log("Equipment children before rollback:", equipment.children);  // Debug line

        // Check if the equipment has been rolled back
        expect(equipment.children).toHaveLength(0);  // Assuming children is a public field
    });
});
