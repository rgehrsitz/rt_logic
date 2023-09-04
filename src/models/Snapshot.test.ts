import { Snapshot } from './Snapshot';
import { Equipment } from './Equipment';

describe('Snapshot', () => {

    it('should create a snapshot with correct default values', () => {
        const equipment = new Equipment('Test Equipment');
        const snapshot = new Snapshot(equipment);

        // Check if id is a valid UUID
        expect(snapshot.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);

        // Check if timestamp is a Date object
        expect(snapshot.timestamp).toBeInstanceOf(Date);

        // Ignore dynamic fields for comparison
        const { id, createdAt, updatedAt, ...restOriginal } = equipment;
        const { id: idClone, createdAt: createdAtClone, updatedAt: updatedAtClone, ...restClone } = snapshot.equipment;
        expect(restClone).toEqual(restOriginal);
    });

    it('should find equipment by ID', () => {
        const equipment = new Equipment('Parent');
        const child1 = new Equipment('Child 1');
        equipment.addChild(child1);

        const snapshot = new Snapshot(equipment);
        const foundChild = snapshot.findEquipmentById(child1.id);

        expect(foundChild?.name).toEqual('Child 1');  // Use toEqual
    });

    it('should make a deep copy of the equipment object', () => {
        const equipment = new Equipment('Test Equipment');
        const snapshot = new Snapshot(equipment);

        equipment.name = 'Modified';

        expect(snapshot.equipment.name).toBe('Test Equipment');
    });

    it('should update snapshot timestamp when equipment is updated', () => {
        const equipment = new Equipment('Test Equipment');
        const snapshot = new Snapshot(equipment);

        const originalTimestamp = snapshot.timestamp;

        snapshot.updateSnapshot(equipment);

        expect(snapshot.timestamp).not.toBe(originalTimestamp);
    });


});