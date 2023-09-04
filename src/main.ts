import { Equipment } from './models/Equipment';
import { SnapshotService } from './services/SnapshotService';

async function main () {
    // Initialize SnapshotService with the path to the Git repository
    const snapshotService = new SnapshotService('./snapshots-repo');

    // Initialize the Git repository
    await snapshotService.initGitRepo();

    // Create some sample equipment
    const networkCard1 = new Equipment('Network Card 1', { vendor: 'Intel', version: '1.0' });
    const server1 = new Equipment('Server 1', { vendor: 'Dell', version: '2.0' }, [networkCard1]);

    // Create a snapshot and commit it
    await snapshotService.createSnapshot(server1, 'snapshot1.json', 'Initial snapshot of Server 1');

    // Load the snapshot from the JSON file
    const loadedSnapshot = snapshotService.loadSnapshot('snapshot1.json');
    console.log('Loaded Snapshot:', loadedSnapshot);

    // Update the equipment
    server1.updateUserDefinedFields({ version: '2.1' });
    server1.addChild(new Equipment('Network Card 2', { vendor: 'Intel', version: '1.1' }));

    // Update the snapshot and commit it
    await snapshotService.updateSnapshot(loadedSnapshot, server1, 'snapshot1.json', 'Updated snapshot of Server 1');

    // Get commit history
    const commitHistory = await snapshotService.getCommitHistory();
    console.log('Commit History:', commitHistory);
}

// Run the main function
main().catch(console.error);
