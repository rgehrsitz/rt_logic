import { Equipment } from './Equipment';
import { v4 as uuidv4 } from 'uuid';

export class Snapshot {
    id: string; // Unique ID for the snapshot
    timestamp: Date; // Timestamp for when the snapshot was taken
    equipment: Equipment; // Deep copy of the Equipment object

    constructor(equipment: Equipment) {
        this.id = uuidv4(); // Use uuid to generate a unique ID
        this.timestamp = new Date();
        this.equipment = equipment.clone(); // Use the clone method
    }

    updateSnapshot (newEquipment: Equipment) {
        this.equipment = newEquipment.clone(); // Use the clone method
        this.timestamp = new Date();
    }

    // Method to get a specific Equipment object by ID from the snapshot
    findEquipmentById (id: string): Equipment | null {
        return this.equipment.findChildById(id);
    }
}
