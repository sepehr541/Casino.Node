import { Table } from "./Table";
import { IdGenerator } from "./IdGenerator";
import "./CustomErrors";
import { InsufficentChipsError } from "./CustomErrors";
export class Player {
    // Properties:
    // playerID
    playerID: number;

    // name
    name: string;

    // chips
    chipsCount: number;

    // current table id
    tableID: Table;

    // seat at the table
    seat: number;

    // functions:
    constructor(name) {
        this.name = name;
        this.chipsCount = 0;
        this.playerID = IdGenerator.generateID();
        this.tableID = null;
        this.seat = -1;
    }

    // join table
    joinTable(table) {
        if (this.tableID !== null) {
            this.leaveTable();
            this.seat = -1;
        }
        this.tableID = table;
        table.acceptPlayer(this);
    }

    // leave table
    leaveTable() {
        // let table know your leaving
        this.tableID.discardPlayer(this);
        this.tableID = null;
    }

    /**
     * Player bets at the table
     * @param amount amount of bet
     */
    betChips(amount: number) {
        //Throw error if amount is bigger than chips in account
        if (this.chipsCount < amount) {
            throw new InsufficentChipsError("Not enough chips");
        }

        // Catch errors thrown by the table
        try {
            this.tableID.placeBet(amount, this);
            this.chipsCount -= amount;
        } 
        // TODO add more specific errors
        catch (error) {
            console.log(error);
        }
    }

    /**
     * getter for playerID
     * 
     * @returns {string}
     */
    getPlayerID(): string {
        return this.playerID.toString();
    }
    
    /**
     * setter for seat
     * @param seatIndex seat index at the table
     */
    setSeat(seatIndex) {
        this.seat = seatIndex;
    }

    /**
     * getter for seat
     * 
     * @returns {number}
     */
    getSeat(): number{
        return this.seat;
    }
}