import { FileService } from './FileService';
import { Equipment, IUserDefinedFields } from '../models/Equipment';
import { Snapshot } from '../models/Snapshot';
import * as fs from 'fs';
import * as path from 'path';

describe('FileService', () => {
    const testEquipmentFilename = 'testEquipment.json';
    const testSnapshotFilename = 'testSnapshot.json';

    const userFields: IUserDefinedFields = {
        vendor: 'Dell',
        version: '1.0'
    };

    const equipment = new Equipment('Server', userFields);
    const snapshot = new Snapshot(equipment);

    afterAll(() => {
        // Cleanup: Remove test files
        fs.unlinkSync(path.resolve(__dirname, testEquipmentFilename));
        fs.unlinkSync(path.resolve(__dirname, testSnapshotFilename));
    });

    it('should save Equipment to JSON', () => {
        FileService.saveEquipmentToJSON(equipment, testEquipmentFilename);
        expect(fs.existsSync(path.resolve(__dirname, testEquipmentFilename))).toBeTruthy();
    });

    it('should load Equipment from JSON', () => {
        const loadedEquipment = FileService.loadEquipmentFromJSON(testEquipmentFilename);
        expect(loadedEquipment).toEqual(equipment);
    });

    it('should save Snapshot to JSON', () => {
        FileService.saveSnapshotToJSON(snapshot, testSnapshotFilename);
        expect(fs.existsSync(path.resolve(__dirname, testSnapshotFilename))).toBeTruthy();
    });

    it('should load Snapshot from JSON', () => {
        const loadedSnapshot = FileService.loadSnapshotFromJSON(testSnapshotFilename);
        expect(loadedSnapshot).toEqual(snapshot);
    });
});
