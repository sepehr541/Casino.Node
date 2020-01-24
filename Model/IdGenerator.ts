/**
 * This class with have static methods for IdGeneration.
 */
export class IdGenerator{
    // TEMPORARY STORAGE
    static storage : object = {};
    // Functions

    /**
     * This function generates an ID for players, tables, etc.
     * 
     * @returns {number}
     */
    static generateID(){
        let id = Math.floor(Math.random() * 1000);
        while (this.storage.hasOwnProperty(id)){
            id = Math.floor(Math.random() * 1000);
        }
        this.storage[id] = id
        return id;
    }


    /**
     * This function validates a given ID
     * 
     * @param number id
     * 
     * @returns {boolean}
     */

    static validateID(id: number): boolean {return  this.storage[id] === id};

}