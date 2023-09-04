import { Equipment } from '../../models/Equipment';
import { Snapshot } from '../../models/Snapshot';
import { FileService } from '../../services/FileService';
import { GitService } from '../../services/GitService';
import { SnapshotService } from '../../services/SnapshotService';
import * as fs from 'fs';
import * as path from 'path';

describe('Equipment and Snapshot Integration Tests', () => {

    let equipment: Equipment;
    let snapshot: Snapshot;
    let snapshotService: SnapshotService;

    beforeAll(async () => {
        // Define the path to the Git repository
        const repoPath = path.resolve(__dirname, '/mockrepo');

        // Check if the directory exists
        if (!fs.existsSync(repoPath)) {
            // Create the directory
            fs.mkdirSync(repoPath, { recursive: true });
        }

        // Initialize GitService and SnapshotService
        snapshotService = new SnapshotService(repoPath);
        // Initialize the Git repository
        await snapshotService.initGitRepo();
    });

    beforeEach(() => {
        // Create new Equipment and Snapshot objects
        equipment = new Equipment('Server');
        snapshot = new Snapshot(equipment);
    });

    it('should correctly create a snapshot from equipment', async () => {
        // Create a snapshot and save it
        await snapshotService.createSnapshot(equipment, 'snapshot.json', 'Initial commit');

        // Load the snapshot
        const loadedSnapshot = snapshotService.loadSnapshot('snapshot.json');

        // Assertions to check if the snapshot correctly represents the equipment
    });

    it('should reflect equipment updates in a new snapshot', async () => {
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
