
var IdGenerator = require("./IdGenerator.js");
var Player = require("./Player");
var { WrongTurnBettingError, NotAtTable } = require("./CustomErrors");
var { Suit, Rank } = require('./Card');
class Table {
    // properties:

    // Table's id
    tableID;

    // max number of players
    size;

    // Game type
    gameOfTable;

    //Table's hand, use if there is any
    dealerHand;

    // Players
    players;

    // Active Players => those who have placed a bet
    actives;

    // index of curr player for turn tracking
    // NEED TO FIX THE TURN TRACKING
    currPlayer;

    // hands corresponding to each player
    playersHands; // Map<string, string[]>;

    //bets
    bets; // Map<string, number>;

    // if bets are Open
    isBetOpen;

    /** 
     * @param {Game} game game of the table
     */
    constructor(game, id, socket) {
        this.tableID = id;
        this.size = game.getSize();
        this.gameOfTable = game;
        this.players = [];
        this.actives = [];
        for (let i = 0; i < this.size; i++) {
            this.players.push(null);
            this.actives.push(null);
        }
        this.playersHands = new Map();
        this.bets = new Map();
        this.currPlayer = 0;
        this.dealerHand = [];
        this.isBetOpen = true;
        this.socket = socket;
    }


    /* 
    These functions are shared among games,
    Table will call them on the game of the table
    */


    /**
     * Deals all the players at the table
     * Calls the dealAll of game for game-specific dealing
     */
    dealAll() {
        // close bets
        this.isBetOpen = false;

        // deal all players
        this.currPlayer = this.gameOfTable.dealAll(this.dealerHand,
            this.players,
            this.bets,
            this.playersHands);
        
    }

    dealPlayer() {
        this.gameOfTable.dealPlayer(this.players[this.currPlayer].getPlayerId(), this.playersHands);
        this.currPlayer = this.gameOfTable.getNextPlayer(this.players, this.currPlayer);
    }

    /**
     * Skips the player
     */
    skipPlayer() {
        this.currPlayer = this.gameOfTable.skipPlayer(this.currPlayer, this.players);
    }

    /**
     * Accepts a player
     * @param {Player} player 
     * @returns {Boolean}
     */
    acceptPlayer(player) {
        let seatIndex = this.players.indexOf(null);
        if (player === null || seatIndex === -1) {
            return false;
        } else {
            // first null will be replaced with the player
            this.players[seatIndex] = player;
            player.setSeat(seatIndex);
            //player ahs and empty hand
            this.playersHands.set(player.getPlayerId(), []);
            //player has an initial bet of 0
            this.bets.set(player.getPlayerId().toString(), 0);
            return true;
        }

    }

    /**
     * removes a player from the table
     * @param {Player} player 
     */
    discardPlayer(player) {
        let seatIndex = player.getSeat();
        if (seatIndex !== -1) {
            this.players[seatIndex] = null;
            if (this.currPlayer === seatIndex) {
                this.currPlayer = this.gameOfTable.getNextPlayer(this.players, this.currPlayer);
            }
        } else {
            throw new NotAtTable("You are not at a table.");
        }
    }

    /**
     * @param {number} amount place the bet at the table
     * @param {Player} player 
     */
    placeBet(amount, player) {
        this.bets.set(player.getPlayerId(), amount);
        this.actives[player.getSeat()] = player;
    }

    // Getters and Setters
    getTableId() {
        return this.tableID;
    }

    drawTable() {
        this.players.forEach(player => {
            if (player !== null) {
                let id = player.getPlayerId();
                console.log(`${player.getName()} : ${this.bets.get(id)}, Hand: ${this.drawHand(this.playersHands.get(id))}`);
            }
        })
        if (this.dealerHand.length !== 0) {
            console.log(`Dealer : ${this.drawHand(this.dealerHand)}`);
        }
    }

    /**
     * Draw hand with utf8
     * @param {String[]} hand 
     */
    drawHand(hand) {

        let suited = []
        hand.forEach(card => {
            let splited = card.split("-");
            suited.push(`${Suit[splited[0]]}${Rank[splited[1]]}`);
        })
        return suited;
    }

    getStatus() {
        // each player has a name, bet, hand, seatIndex

        // we want
        let state = {
            isBetOpen: this.isBetOpen,
            currentPlayer: this.currPlayer,
            dealerHand : this.dealerHand
        }


        this.players.forEach((p, i) => {
            if (p !== null) {
                let player = {}
                player.name = p.getName();
                player.bet = this.bets.get(p.getPlayerId());
                player.hand = this.playersHands.get(p.getPlayerId());
                player.seat = p.getSeat();
                state[i] = player;
            }
        })
        
        return state;
    }

    /**
     * hasSeat
     */
    hasSeat() {
        return this.players.includes(null);
    }

    setSocket(socket) {
        this.socket = socket;
    }
}

module.exports = Table;