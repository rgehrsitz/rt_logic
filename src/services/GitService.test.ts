import { GitService } from '../services/GitService';
import simpleGit, { SimpleGit, DefaultLogFields } from 'simple-git';
import { mockDeep, mockReset } from 'jest-mock-extended';



// Mock the simple-git library
jest.mock('simple-git');

const mockedSimpleGit = simpleGit as jest.MockedFunction<typeof simpleGit>;
const gitMock = mockDeep<SimpleGit>();

describe('GitService', () => {
    let gitService: GitService;

    beforeEach(() => {
        mockReset(gitMock);
        mockedSimpleGit.mockReturnValue(gitMock);
        gitService = new GitService('/path/to/repo');
    });

    it('should initialize a new Git repository', async () => {
        await gitService.initRepo();
        expect(gitMock.init).toHaveBeenCalled();
    });

    it('should commit a file to the repository', async () => {
        await gitService.commitFile('file.txt', 'Initial commit');
        expect(gitMock.add).toHaveBeenCalledWith('file.txt');
        expect(gitMock.commit).toHaveBeenCalledWith('Initial commit');
    });

    it('should create a new branch', async () => {
        await gitService.createBranch('feature-branch');
        expect(gitMock.checkoutLocalBranch).toHaveBeenCalledWith('feature-branch');
    });

    it('should switch to an existing branch', async () => {
        await gitService.switchBranch('main');
        expect(gitMock.checkout).toHaveBeenCalledWith('main');
    });

    it('should get the commit history', async () => {
        const mockLog = [
            {
                hash: '12345',
                date: '2021-01-01',
                message: 'Initial commit',
                author_email: 'test@example.com',
                author_name: 'Test User',
                refs: '',
                body: ''
            },
        ] as any;  // Use type assertion here
        gitMock.log.mockResolvedValueOnce({ all: mockLog, total: 1, latest: mockLog[0] });

        const history = await gitService.getCommitHistory();
        expect(history).toEqual(mockLog);
    });
});
