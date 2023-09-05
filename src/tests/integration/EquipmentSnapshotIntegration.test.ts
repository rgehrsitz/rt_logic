import { Equipment } from '../../models/Equipment';
import { Snapshot } from '../../models/Snapshot';
import { SnapshotService } from '../../services/SnapshotService';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';


describe('Equipment and Snapshot Integration Tests', () => {

    let equipment: Equipment;
    let snapshot: Snapshot;
    let snapshotService: SnapshotService;

    let tempDir: string;

    beforeAll(async () => {
        // Create a temporary directory
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'git-test-'));

        // Initialize GitService and SnapshotService
        snapshotService = new SnapshotService(tempDir);
        await snapshotService.initGitRepo();
    });

    afterAll(async () => {
        // Remove the temporary directory
        if (fs.existsSync(tempDir)) {
            await fs.promises.rm(tempDir, { recursive: true, force: true });
        }
    });

    beforeEach(() => {
        // Create new Equipment and Snapshot objects
        equipment = new Equipment('Server');
        snapshot = new Snapshot(equipment);
    });

    it('should correctly create a snapshot from equipment', async () => {
        // Create a snapshot and save it
        const snapshotFilePath = path.join(tempDir, 'snapshot.json');
        await snapshotService.createSnapshot(equipment, snapshotFilePath, 'Initial commit');

        // Debug: Check if the file exists
        if (fs.existsSync(snapshotFilePath)) {
            console.log(`Snapshot file exists at ${snapshotFilePath}`);
        } else {
            console.error(`Snapshot file does not exist at ${snapshotFilePath}`);
        }

        // ... (rest of your test)
    });

    it('should reflect equipment updates in a new snapshot', async () => {
        // Update the equipment
        equipment.addChild(new Equipment('Network Card'));

        // Create a new snapshot
        const updatedSnapshotFilePath = path.join(tempDir, 'snapshot_updated.json');
        await snapshotService.createSnapshot(equipment, updatedSnapshotFilePath, 'Added Network Card');

        // Debug: Check if the file exists
        if (fs.existsSync(updatedSnapshotFilePath)) {
            console.log(`Updated snapshot file exists at ${updatedSnapshotFilePath}`);
        } else {
            console.error(`Updated snapshot file does not exist at ${updatedSnapshotFilePath}`);
        }
        // Update the equipment
        equipment.addChild(new Equipment('Network Card'));

        // Create a new snapshot
        await snapshotService.createSnapshot(equipment, 'snapshot_updated.json', 'Added Network Card');

        // Load the new snapshot
        const updatedSnapshot = snapshotService.loadSnapshot('snapshot_updated.json');

        // Assertions to check if the new snapshot correctly represents the updated equipment
    });

    // Add more tests as needed
});
