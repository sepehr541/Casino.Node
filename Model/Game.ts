export interface Game {
    // Each game has a
    // number of players
    size: number;
    //number of decks
    decksRequired: number;

    // Each game needs to
    // Deal to all players at first
    dealAll();
    // deal individual players
    dealPlayer();
    nextPlayer();
    acceptPlayer(): boolean;
    discardPlayer();

}