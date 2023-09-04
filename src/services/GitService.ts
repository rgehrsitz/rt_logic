import simpleGit, { SimpleGit } from 'simple-git';

export class GitService {
    git: SimpleGit;

    constructor(repoPath: string) {
        this.git = simpleGit(repoPath);
    }

    // Initialize a new Git repository
    async initRepo () {
        try {
            await this.git.init();
        } catch (error) {
            console.error('Error initializing Git repository:', error);
        }
    }

    // Commit a file to the repository
    async commitFile (filename: string, commitMessage: string) {
        try {
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
