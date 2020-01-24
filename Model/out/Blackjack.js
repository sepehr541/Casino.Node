"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = require("./Deck");
class Blackjack {
    // functions:
    constructor() {
        this.size = 7;
        this.decksRequired = 6;
        this.deck = new Deck_1.Deck(6);
    }
    dealAll(players, hands) {
        if (players.length !== 0) {
            for (let player of players) {
                hands[player] = this.deck.getCard();
            }
        }
    }
    dealPlayer(Player) {
        throw new Error("Method not implemented.");
    }
    clearAll() {
    }
}
exports.Blackjack = Blackjack;
//# sourceMappingURL=Blackjack.js.map