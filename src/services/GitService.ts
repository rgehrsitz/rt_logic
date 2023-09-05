import simpleGit, { SimpleGit } from 'simple-git';
import * as fs from 'fs';

export class GitService {
    git: SimpleGit;

    constructor(private workingDir: string) {
        this.git = simpleGit({ baseDir: workingDir });
    }

    // Initialize a new Git repository
    async initRepo (): Promise<void> {
        try {
            await this.git.init();
        } catch (error) {
            console.error('Error initializing Git repository:', error);
        }
    }

    // Commit a file to the repository
    async commitFile (filename: string, commitMessage: string): Promise<void> {
        try {
            console.log("Current Directory:", this.workingDir);  // Debug line
            const fileList = await this.git.raw(['ls-files']);

            console.log("Files:", fileList);  // Debug line

            await this.git.add(filename);
            await this.git.commit(commitMessage);
        } catch (error) {
            console.error('Error committing file:', error);
        }
    }

    // Create a new branch
    async createBranch (branchName: string) {
        try {
            await this.git.checkoutLocalBranch(branchName);
        } catch (error) {
            console.error('Error creating branch:', error);
        }
    }

    // Switch to an existing branch
    async switchBranch (branchName: string) {
        try {
            await this.git.checkout(branchName);
        } catch (error) {
            console.error('Error switching branch:', error);
        }
    }

    // Get the commit history
    async getCommitHistory () {
        try {
            const log = await this.git.log();
            return log.all;
        } catch (error) {
            console.error('Error fetching commit history:', error);
            return [];
        }
    }
}
