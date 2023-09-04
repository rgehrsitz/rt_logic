import { Equipment, IUserDefinedFields } from './Equipment';

describe('Equipment', () => {

    it('should generate a unique ID on creation', () => {
        const equipment = new Equipment('Server 1');
        expect(equipment.id).toBeDefined();
    });

    it('should set the name on creation', () => {
        const name = 'Server 1';
        const equipment = new Equipment(name);
        expect(equipment.name).toBe(name);
    });

    it('should set createdAt and updatedAt dates on creation', () => {
        const equipment = new Equipment('Server 1');
        expect(equipment.createdAt).toBeInstanceOf(Date);
        expect(equipment.updatedAt).toBeInstanceOf(Date);
    });

    it('should initialize children array', () => {
        const equipment = new Equipment('Server 1');
        expect(equipment.children).toEqual([]);
    });

    it('should initialize userDefinedFields object', () => {
        const equipment = new Equipment('Server 1');
        expect(equipment.userDefinedFields).toEqual({});
    });

    it('should update userDefinedFields', () => {
        const equipment = new Equipment('Server 1');
        const newFields = { vendor: 'Dell' };
        equipment.updateUserDefinedFields(newFields);
        expect(equipment.userDefinedFields).toEqual(newFields);
    });

    it('should update updatedAt date when updating userDefinedFields', () => {
        const equipment = new Equipment('Server 1');
        const originalDate = equipment.updatedAt;
        equipment.updateUserDefinedFields({ vendor: 'Dell' });
        expect(equipment.updatedAt).not.toBe(originalDate);
    });

    // Add tests for other methods...

});

describe('Equipment', () => {
    let equipment: Equipment;

    beforeEach(() => {
        equipment = new Equipment('Server', { vendor: 'Dell', version: '1.0' });
    });

    test('should initialize with correct values', () => {
        expect(equipment.name).toBe('Server');
        expect(equipment.userDefinedFields).toEqual({ vendor: 'Dell', version: '1.0' });
        expect(equipment.children).toEqual([]);
    });

    test('should update user-defined fields', () => {
        equipment.updateUserDefinedFields({ version: '1.1' });
        expect(equipment.userDefinedFields).toEqual({ vendor: 'Dell', version: '1.1' });
    });

    test('should add child equipment', () => {
        const child = new Equipment('Network Card', { vendor: 'Intel', version: '1.0' });
        equipment.addChild(child);
        expect(equipment.children).toContain(child);
    });

    test('should remove child equipment by ID', () => {
        const child = new Equipment('Network Card', { vendor: 'Intel', version: '1.0' });
        equipment.addChild(child);
        equipment.removeChildById(child.id);
        expect(equipment.children).not.toContain(child);
    });

    test('should find child equipment by ID', () => {
        const child = new Equipment('Network Card', { vendor: 'Intel', version: '1.0' });
        equipment.addChild(child);
        const foundChild = equipment.findChildById(child.id);
        expect(foundChild).toBe(child);
    });

    test('should return null if child equipment not found by ID', () => {
        const foundChild = equipment.findChildById('nonexistent-id');
        expect(foundChild).toBeNull();
    });
});