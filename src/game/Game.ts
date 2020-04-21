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
    dealAll(dealerHand : string[], players: Player[], bets: object, hands: object);

    // deal individual players
    dealPlayer(currentPlayerID: string, hands: object);

    //skip to the next player
    skipPlayer(current: number, players): number;

    // get first player in turn
    getFirstPlayer(players: Player[]);

    // get next player in turn
    getNextPlayer(players: Player[], currentPlayer: number): number;

    clearAll();

}