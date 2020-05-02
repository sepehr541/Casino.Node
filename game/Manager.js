const Table = require('./Table');
const Blackjack = require('./Blackjack');

/**
 * find a table with empty seat
 * @param {Tables[]} tables 
 */
const findEmptyTable = (tables) => {
    for (let i = 0; i < tables.length; i++) {
        if (tables[i].hasSeat()) {
            return tables[i];
        }
    }
    return null;
}




// make private tables
const makePrivateTable = (privates, id) =>{
    privates.push(new Table())
}

// verify wins with db

module.exports = {
    findEmptyTable,
    makePrivateTable
}