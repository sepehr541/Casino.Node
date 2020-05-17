const Table = require('./Table');
const Blackjack = require('./Blackjack');

/**
 * find a table with empty seat
 * @param {Tables[]} tables 
 */
const findEmptyTable = (tables, idArray) => {
    for (id of idArray) {
        if (tables[id].hasSeat()) {
            return tables[id];
        }
    }
    return null;
}




// make private tables
const makePrivateTable = (privates, id) =>{
    privates[id] = (new Table(new Blackjack(), id, null));
}

// verify wins with db

module.exports = {
    findEmptyTable,
    makePrivateTable
}