import { Player } from "./Player";
import { Deck } from "./Deck";

export interface Game {
    // Each game has a
    // number of players
    size: number;

    //number of decks
    decksRequired: number;

    // the current deck used if any
    deck? : Deck;
    // Each game needs to
    // Deal to all players at first
    dealAll(players: Player[], hands: object);

    // deal individual players
    dealPlayer(Player: Player, Deck: number[][]);

    clearAll();

}