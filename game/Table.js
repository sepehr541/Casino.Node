
var IdGenerator = require("./IdGenerator.js");
var Player = require("./Player");
var { WrongTurnBettingError, NotAtTable } = require("./CustomErrors");
var { Suit, Rank } = require('./Card');
class Table {
    // properties:
    // Table's id
    tableId;

    // max number of players
    size;

    // Game type
    gameOfTable;

    //Table's hand, use if there is any
    dealerHand;

    // Players
    players;

    // Active Players => those who have placed a bet
    // [].fill(null), playerId at their index while rest remain null
    actives;

    // index of curr player for turn tracking
    // NEED TO FIX THE TURN TRACKING
    currentPlayer;

    // hands corresponding to each player
    playersHands; // Map<string, string[]>;

    //bets
    bets; // Map<string, number>;

    // if bets are Open
    isBetOpen;

    // idle or playing
    isGameRunning;

    // player count
    playerCount;

    // show dealer's hand to player or not
    showDealer;

    // tracking handsSum instead of recalculating
    handsSum;

    /** 
     * @param {Game} game game of the table
     */
    constructor(game, id, socket) {
        this.tableId = id;
        this.size = game.getSize();
        this.gameOfTable = game;
        this.players = Array(this.size).fill(null);
        this.actives = Array(this.size);
        this.playersHands = new Map();
        this.bets = new Map();
        this.currentPlayer = 0;
        this.dealerHand = [];
        this.isBetOpen = true;
        this.socket = socket;
        this.isGameRunning = false;
        this.playerCount = 0;
        this.showDealer = false;
        this.handsSum = {};
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
        // deal all players
        this.gameOfTable.dealAll(this.dealerHand,
            this.players,
            this.bets,
            this.playersHands);
    }

    dealPlayer() {
        this.gameOfTable.dealPlayer(this.players[this.currentPlayer].getPlayerId(), this.playersHands);
    }

    dealDealer() {
        this.gameOfTable.dealDealer(this.dealerHand);
    }

    getNextPlayer() {
        console.log('Get next player is called');
        // add to the index
        this.currentPlayer = (this.currentPlayer + 1) % (this.size + 1);
        if (this.currentPlayer !== 5) {
            // check if null or no bet
            if (this.players[this.currentPlayer] === null ||
                this.bets.get(this.players[this.currentPlayer].getPlayerId() === 0)) {
                this.getNextPlayer();
            }
        }
    }


    /**
     * We only join if table returned true for hasSeat in the search
     * Accepts a player
     * @param {Player} player 
     * @returns {Boolean}
     */
    acceptPlayer(player) {
        let seatIndex = this.players.indexOf(null);

        // first null will be replaced with the player
        this.players[seatIndex] = player;
        player.setSeat(seatIndex);
        //player ahs and empty hand
        this.playersHands.set(player.getPlayerId(), []);
        //player has an initial bet of 0
        this.bets.set(player.getPlayerId().toString(), 0);
        this.playerCount++;
        if (this.playerCount === 1)
            this.gameloop();
    }

    /**
     * removes a player from the table
     * @param {Player} player 
     */
    discardPlayer(player) {
        // get index
        let seatIndex = player.getSeat();
        // set to null
        this.players[seatIndex] = null;
        // if has bet
        if (this.actives[seatIndex] !== null) {
            this.actives[seatIndex] = null;
        }
        this.playerCount--;
    }

    /**
     * @param {number} amount place the bet at the table
     * @param {Player} player 
     */
    placeBet(amount, player) {
        this.bets.set(player.getPlayerId(), this.bets.get(player.getPlayerId()) + amount);
        this.actives[player.getSeat()] = player.getPlayerId();
    }

    // Getters and Setters
    getTableId() {
        return this.tableId;
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
            currentPlayer: this.currentPlayer,
            dealerHand: this.dealerHand,
            tableId: this.tableId,
            showDealer: this.showDealer
        }

        this.players.forEach((p, i) => {
            if (p !== null) {
                let player = {}
                player.name = p.getName();
                player.bet = this.bets.get(p.getPlayerId());
                player.hand = this.playersHands.get(p.getPlayerId());
                player.seat = p.getSeat();
                player.chips = p.getChips();
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

    // find player object by id
    findPlayer(id) {
        return this.players.find((player) => player ? player.getPlayerId() === id : false);
    }

    emitToSocket(event, payload) {
        this.socket.emit(event, payload);
    }

    emitStatus() {
        let status = this.getStatus();
        console.log("Emitting Event UPDATE");
        console.log(status);
        this.emitToSocket('UPDATE', status);
    }

    handleBetEvent({ playerId, value }) {
        console.log('Betting');
        try {
            this.findPlayer(playerId).betChips(value);
            this.emitStatus();
        } catch (e) {
            this.emitToSocket("INSUFFICIENT_CHIPS", { playerId });
        }

    }

    openBets() {
        this.isBetOpen = true;
    }

    closeBets() {
        this.isBetOpen = false;
    }

    // used to orchestrate users' actions
    gamePromise;
    gameInterval;
    resolvePlayerPromise;

    async gameloop() {
        console.log('Game Loop started');
        let WAIT_TIME = 10000;
        while (this.playerCount > 0) {
            console.log('Begin round');
            // open bets
            this.openBets();
            this.emitStatus();

            // wait for bets and then close bets
            // start dealing cards to players with bets > 0
            let betTimer = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, WAIT_TIME) // 10 seconds
            })

            // wait
            await betTimer;

            // close the bets and emit
            console.log("Closing bets");
            this.closeBets();
            this.emitStatus();
            console.log("Bets closed");

            // deal all players with a bet
            console.log("Dealing all");
            this.dealAll();
            this.emitStatus();
            console.log('All dealt');
            console.log("Players' turn");
            console.log('CurrentPlayer: ' + this.currentPlayer);
            // now wait on each player and their action
            while (this.currentPlayer < this.size && this.playerCount > 0) {
                if (this.isActive(this.currentPlayer)) {
                    // both promise and timeout accessible via class fields
                    this.gamePromise = new Promise((resolve, reject) => {
                        // saving ref to resolve function
                        this.resolvePlayerPromise = resolve;
                        // set timer for AFK player
                        this.gameInterval = setTimeout(() => {
                            resolve("STAY");
                        }, WAIT_TIME)
                    });

                    // if no action from player, the timeout will resolve the promise
                    // if there is an action from player, we resolve the promise, clear the timeout
                    console.log('Waiting on Action');
                    let action = await this.gamePromise;

                    console.log("Player Choose to: " + action);
                    // get currentPlayers Hand
                    let playerId = this.players[this.currentPlayer].getPlayerId();
                    let playerHand = this.playersHands.get(playerId);
                    // sum the hand
                    let handSum = this.gameOfTable.sumHand(playerHand);
                    console.log(this.players[this.currentPlayer].getName() + " HandSum: " + handSum);
                    this.handsSum[playerId] = handSum;
                    if (handSum === 21) {
                        this.getNextPlayer();
                    }
                    else {
                        if (action === 'HIT') {
                            this.dealPlayer();
                            if (this.gameOfTable.sumHand(playerHand) >= 21) {
                                this.getNextPlayer();
                            }
                        } else {
                            this.getNextPlayer();
                        }
                    }
                }
                // if player not playing
                else {
                    this.getNextPlayer();
                }

                this.emitStatus();
            }

            console.log('Revealing Dealer');
            // reveal dealer's hand
            this.showDealerHand();
            this.emitStatus();

            console.log('Suming dealer hand');
            // if 16 or less, hit dealer until above 16
            let dealerSum = this.gameOfTable.sumHand(this.dealerHand);

            while (dealerSum <= 16) {
                console.log('Hitting dealer');
                this.dealDealer();
                dealerSum = this.gameOfTable.sumHand(this.dealerHand);
                this.emitStatus();
            }

            // compare hands and then pay winners
            console.log('Paying players');
            this.payPlayers(dealerSum, this.handsSum, this.players);

            let showoffTimer = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, WAIT_TIME - 3000) // 10 seconds
            })

            // wait
            await showoffTimer;
            console.log('Reseting Table');
            // repeat if players present at table, else idle (out of while loop)
            this.resetTable();
            this.emitStatus();
        }

        this.resetTable();
    }

    resolveAction(action, playerId) {
        if (this.players[this.currentPlayer] !== null && this.currentPlayer !== 5) {
            if (this.players[this.currentPlayer].getPlayerId() === playerId) {
                clearTimeout(this.gameInterval);
                this.resolvePlayerPromise(action);
            }
        }
    }

    handleLeaveEvent(playerId) {
        let p = null;
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            if (player !== null)
                if (player.getPlayerId() === playerId)
                    p = player;
        }
        if (p !== null) {
            p.leaveTable();
            this.emitStatus();
        }
    }


    handleJoinEvent(name) {
        let player = new Player(name);
        player.joinTable(this);
        return player.getPlayerId();
    }

    /**
     * 
     * @param {Integer} playerIndex index of player's seat
     */
    isActive(playerIndex) {
        return this.actives[playerIndex] !== null;
    }

    handleHitEvent(payload) {
        this.resolveAction('HIT', payload.playerId);
    }

    handleStayEvent(payload) {
        this.resolveAction('STAY', payload.playerId)
    }

    hideDealerHand() {
        this.showDealer = false;
    }

    showDealerHand() {
        this.showDealer = true;
    }

    /**
     * 
     * @param {Integer} dealerSum deals hand sum
     * @param {Object} handsSum Object<PlayerId, handSum:Integer>
     * @param {Array} players the array of players
     */
    payPlayers(dealerSum, handsSum, players) {
        console.log('Paying players called');
        for (let player of players) {
            if (player !== null && this.isActive(player.getSeat())) {
                console.log('Before Payment Player has: ' + player.getChips());
                let handSum = handsSum[player.getPlayerId()];
                console.log(player.getName() + ' has ' + handSum);
                if (handSum <= 21) {
                    // blackjack
                    if (handSum === 21 && this.playersHands.get(player.getPlayerId()).length === 2 && dealerSum !== 21) {
                        player.addChips(this.bets.get(player.getPlayerId()) * (5 / 2));
                    }
                    // regular hand
                    else {
                        console.log('Regular Hand');
                        if (handSum > dealerSum || dealerSum > 21) {
                            player.addChips(this.bets.get(player.getPlayerId()) * 2);
                        } else if (handSum === dealerSum) {
                            player.addChips(this.bets.get(player.getPlayerId()));
                        }
                    }
                }
                console.log('After Payment Player has: ' + player.getChips());
            }

        }
    }

    resetTable() {
        console.log("reset Called");
        for (let player of this.players) {
            if (player !== null) {
                // reset hand
                this.playersHands.set(player.getPlayerId(), []);
                // reset bet
                this.bets.set(player.getPlayerId(), 0);
            }
        }
        this.dealerHand = [];
        this.hideDealerHand();
        this.actives = Array(this.size);
        this.currentPlayer = 0;
    }


    getPlayerById(playerId) {
        for (let player of this.players) {
            if (player !== null) {
                if (player.getPlayerId() === playerId) {
                    return player;
                }
            }
        }
        return null;
    }
}

module.exports = Table;