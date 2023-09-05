import { Equipment } from '../models/Equipment';
import { Snapshot } from '../models/Snapshot';
import { FileService } from './FileService';
import { GitService } from './GitService';
import * as fs from 'fs';
import * as path from 'path';

export class SnapshotService {
    gitService: GitService;
    repoPath: string;  // Add this line

    constructor(repoPath: string) {
        this.gitService = new GitService(repoPath);
        this.repoPath = repoPath;  // Initialize it here
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

    // Delete a snapshot
    async deleteSnapshot (filename: string, commitMessage: string) {
        // Delete the file
        const filePath = path.join(this.repoPath, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Commit the deletion to the Git repository
        await this.gitService.commitFile(filename, commitMessage);
    }

    // Modify an existing snapshot
    async modifySnapshot (equipment: Equipment, filename: string, commitMessage: string) {
        const snapshot = this.loadSnapshot(filename);
        console.log("Snapshot object type:", typeof snapshot);  // Debug line

        snapshot.updateSnapshot(equipment);
        FileService.saveSnapshotToJSON(snapshot, filename);

        // Commit the modified snapshot to the Git repository
        await this.gitService.commitFile(filename, commitMessage);
    }

    // Compare two snapshots
    compareSnapshots (filename1: string, filename2: string): boolean {
        const snapshot1 = this.loadSnapshot(filename1);
        const snapshot2 = this.loadSnapshot(filename2);

        console.log("Comparing snapshots:", snapshot1, snapshot2);  // Debug line


        // Implement your comparison logic here
        // For example, you could compare the JSON string representations
        return JSON.stringify(snapshot1) === JSON.stringify(snapshot2);
    }

    // Rollback to a previous snapshot
    async rollbackToSnapshot (filename: string, currentEquipment: Equipment) {
        const snapshot = this.loadSnapshot(filename);
        currentEquipment = snapshot.equipment;  // Assuming equipment is a public field in Snapshot
    }
}
