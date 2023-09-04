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
    static loadEquipmentFromJSON (filename: string): Equipment {
        const filePath = path.resolve(__dirname, filename);
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as Equipment;
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
        return JSON.parse(data) as Snapshot;
    }
}
