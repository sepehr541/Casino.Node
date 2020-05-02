/**
 * This class with have static methods for IdGeneration.
 */
class IdGenerator{
    // TEMPORARY STORAGE
    static storage = {};
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
     * @param {Number} id the id to check
     * 
     * @returns {boolean}
     */

    static validateID(id) {return  this.storage[id] === id};
}

module.exports = IdGenerator;