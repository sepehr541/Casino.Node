import {Table} from "./Table";
export class Player {
    // Properties:
    // playerID
    playerID: number;

    // name
    name: string;

    // chips
    chipsCount : number;

    // current table id
    tableID: Table;

    // functions:
    constructor(name){
        this.name = name;
        this.chipsCount = 0;
        this.playerID = Math.random() * 10;
        this.tableID = null;
    }

    // join table
    joinTable(table){
        if (table){
            this.leaveTable(table);
        }
        this.tableID = table;
    }

    // leave table
    leaveTable(tableID){
        // let table know your leaving
        this.tableID = null;
        tableID.discardPlayer(this.playerID);
    }

    betChips(){

    }

    /**
     * getter for playerID
     * 
     * @returns {number}
     */
    getPlayerID(): number {
        return this.playerID;
    }    
}