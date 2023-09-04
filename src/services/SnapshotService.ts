import { Equipment } from '../models/Equipment';
import { Snapshot } from '../models/Snapshot';
import { FileService } from './FileService';
import { GitService } from './GitService';

export class SnapshotService {
    gitService: GitService;

    constructor(repoPath: string) {
        this.gitService = new GitService(repoPath);
    }

    // Initialize Git repository
    async initGitRepo () {
        await this.gitService.initRepo();
    }

    // Create a new snapshot and save it to a JSON file
    async createSnapshot (equipment: Equipment, filename: string, commitMessage: string) {
        const snapshot = new Snapshot(equipment);
        FileService.saveSnapshotToJSON(snapshot, filename);

        // Commit the snapshot file to the Git repository
        await this.gitService.commitFile(filename, commitMessage);
    }

    // Load a snapshot from a JSON file
    loadSnapshot (filename: string): Snapshot {
        return FileService.loadSnapshotFromJSON(filename);
    }

    // Update an existing snapshot and save it to a JSON file
    async updateSnapshot (snapshot: Snapshot, newEquipment: Equipment, filename: string, commitMessage: string) {
        snapshot.updateSnapshot(newEquipment);
        FileService.saveSnapshotToJSON(snapshot, filename);

        // Commit the updated snapshot file to the Git repository
        await this.gitService.commitFile(filename, commitMessage);
    }

    // Get commit history from Git repository
    async getCommitHistory () {
        return await this.gitService.getCommitHistory();
    }
}
