"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = require("./Deck");
class Blackjack {
    // functions:
    /**
     * Blackjack
     */
    constructor() {
        this.size = 7;
        this.decksRequired = 6;
        this.deck = new Deck_1.Deck(6);
    }
    /**
     * Deals players Two cards
     * Must be called at the beginning of each round
     *
     * @param players
     * @param hands
     */
    dealAll(players, hands) {
        if (players.length !== 0) {
            //TODO
            // for (let player of players){
            //     hands[player.getPlayerID()] = this.deck.getCard();
            // }
        }
    }
    /**
     *
     */
    dealPlayer(Player) {
        throw new Error("Method not implemented.");
    }
    clearAll() {
    }
}
exports.Blackjack = Blackjack;
//# sourceMappingURL=Blackjack.js.map