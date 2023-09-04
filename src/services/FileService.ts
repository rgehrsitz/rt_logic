import * as fs from 'fs';
import * as path from 'path';
import { Equipment } from '../models/Equipment';
import { Snapshot } from '../models/Snapshot';

export class FileService {
    // Save Equipment object to a JSON file
    static saveEquipmentToJSON (equipment: Equipment, filename: string) {
        const filePath = path.resolve(__dirname, filename);
        fs.writeFileSync(filePath, JSON.stringify(equipment, null, 2));
    }

    // Load Equipment object from a JSON file
    // Load Equipment object from a JSON file
    static loadEquipmentFromJSON (filename: string): Equipment {
        const filePath = path.resolve(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(data) as Equipment;
        parsedData.createdAt = new Date(parsedData.createdAt);
        parsedData.updatedAt = new Date(parsedData.updatedAt);
        return parsedData;
    }

    // Save Snapshot object to a JSON file
    static saveSnapshotToJSON (snapshot: Snapshot, filename: string) {
        const filePath = path.resolve(__dirname, filename);
        fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2));
    }

    // Load Snapshot object from a JSON file
    static loadSnapshotFromJSON (filename: string): Snapshot {
        const filePath = path.resolve(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(data) as Snapshot;
        parsedData.timestamp = new Date(parsedData.timestamp);
        parsedData.equipment.createdAt = new Date(parsedData.equipment.createdAt);
        parsedData.equipment.updatedAt = new Date(parsedData.equipment.updatedAt);
        return parsedData;
    }
}
