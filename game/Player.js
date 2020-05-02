var Table = require("./Table");
var IdGenerator = require( "./IdGenerator.js");

var { InsufficentChipsError } = require("./CustomErrors");

class Player {
    
    /**
     * Construct a player
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.chipsCount = 500;
        this.playerID = IdGenerator.generateID();
        this.tableID = null;
        this.seat = -1;
    }

    /**
     * Join a table
     * @param {Table} table table to join
     * 
     */
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
     * @param {Number} amount amount of bet
     */
    betChips(amount) {
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
    getPlayerId() {
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
    getSeat() {
        return this.seat;
    }

    getName() {
        return this.name;
    }

}

module.exports = Player;