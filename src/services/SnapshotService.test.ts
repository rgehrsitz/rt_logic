import { SnapshotService } from './SnapshotService';
import { Equipment } from '../models/Equipment';
import { Snapshot } from '../models/Snapshot';
import { GitService } from './GitService';
import { FileService } from './FileService';

jest.mock('./GitService');
jest.mock('./FileService');

describe('SnapshotService', () => {
    let snapshotService: SnapshotService;
    const mockGitService = new GitService('mockRepoPath') as jest.Mocked<GitService>;
    const mockFileService = FileService as jest.Mocked<typeof FileService>;

    beforeEach(() => {
        snapshotService = new SnapshotService('mockRepoPath');
        snapshotService.gitService = mockGitService;
    });

    it('should initialize Git repository', async () => {
        await snapshotService.initGitRepo();
        expect(mockGitService.initRepo).toHaveBeenCalled();
    });

    it('should create a new snapshot', async () => {
        const equipment = new Equipment('Server');
        const filename = 'snapshot.json';
        const commitMessage = 'Add snapshot';

        await snapshotService.createSnapshot(equipment, filename, commitMessage);

        expect(mockFileService.saveSnapshotToJSON).toHaveBeenCalledWith(expect.any(Snapshot), filename);
        expect(mockGitService.commitFile).toHaveBeenCalledWith(filename, commitMessage);
    });

    it('should load a snapshot', () => {
        const filename = 'snapshot.json';
        mockFileService.loadSnapshotFromJSON.mockReturnValue(new Snapshot(new Equipment('Server')));
        const snapshot = snapshotService.loadSnapshot(filename);

        expect(mockFileService.loadSnapshotFromJSON).toHaveBeenCalledWith(filename);
        expect(snapshot).toBeInstanceOf(Snapshot);
    });

    it('should update an existing snapshot', async () => {
        const snapshot = new Snapshot(new Equipment('Server'));
        const newEquipment = new Equipment('Updated Server');
        const filename = 'snapshot.json';
        const commitMessage = 'Update snapshot';

        await snapshotService.updateSnapshot(snapshot, newEquipment, filename, commitMessage);

        expect(mockFileService.saveSnapshotToJSON).toHaveBeenCalledWith(expect.any(Snapshot), filename);
        expect(mockGitService.commitFile).toHaveBeenCalledWith(filename, commitMessage);
    });

    it('should get commit history', async () => {
        const mockCommitData = [
            {
                hash: '12345',
                date: '2021-01-01',
                message: 'Initial commit',
                author_email: 'test@example.com',
                author_name: 'Test User',
                refs: '',
                body: '',
                // Add any other required fields here
            }
        ];
        mockGitService.getCommitHistory.mockResolvedValue(mockCommitData);
        const commitHistory = await snapshotService.getCommitHistory();

        expect(mockGitService.getCommitHistory).toHaveBeenCalled();
        expect(commitHistory).toBeInstanceOf(Array);
    });
});
