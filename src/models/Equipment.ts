import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

export interface IUserDefinedFields {
    [key: string]: any; // User-defined fields can be of any type
}

export class Equipment {
    id: string; // Unique ID
    name: string; // Mandatory name
    createdAt: Date; // Date/time created
    updatedAt: Date; // Date/time updated
    children: Equipment[]; // Child components
    userDefinedFields: IUserDefinedFields; // User-defined fields

    constructor(name: string, userDefinedFields: IUserDefinedFields = {}, children: Equipment[] = []) {
        this.id = uuidv4(); // Generate a unique ID
        this.name = name; // Set the name
        this.createdAt = new Date(); // Set the creation date/time
        this.updatedAt = new Date(); // Set the updated date/time
        this.children = children; // Initialize child components
        this.userDefinedFields = userDefinedFields; // Initialize user-defined fields
    }

    // Method to update user-defined fields
    updateUserDefinedFields (newFields: IUserDefinedFields) {
        this.userDefinedFields = { ...this.userDefinedFields, ...newFields };
        this.updatedAt = new Date(); // Update the updated date/time
    }

    // Method to add a child component
    addChild (child: Equipment) {
        this.children.push(child);
        this.updatedAt = new Date(); // Update the updated date/time
    }

    // Method to remove a child component by ID
    removeChildById (id: string) {
        this.children = this.children.filter(child => child.id !== id);
        this.updatedAt = new Date(); // Update the updated date/time
    }

    // Method to find a child component by ID
    findChildById (id: string): Equipment | null {
        console.log(`Searching for ID: ${id} in ${this.name}`);
        for (const child of this.children) {
            console.log(`Checking child: ${child.name}`);
            if (child.id === id) {
                console.log(`Found child: ${child.name}`);
                return child;
            }
            const grandChild = child.findChildById(id);
            if (grandChild) {
                return grandChild;
            }
        }
        console.log(`ID: ${id} not found in ${this.name}`);
        return null;
    }

    clone (): Equipment {
        const clonedEquipment = new Equipment(this.name, { ...this.userDefinedFields });
        clonedEquipment.id = this.id;  // Keep the original ID
        clonedEquipment.children = this.children.map(child => child.clone());  // Make sure to clone children
        return clonedEquipment;
    }
}
