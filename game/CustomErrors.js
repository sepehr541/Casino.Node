class InsufficentChipsError extends Error{
    constructor(message){
        super(message);
        this.name = "InsufficentChipsError"
    }
}

class TableFullError extends Error{
    constructor(message){
        super(message);
        this.name = "TableFullError";
    }
}

class InvalidAmountError extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidAmountError";
    }
}


class TableBetsClosedError extends Error{
    constructor(message){
        super(message);
        this.name = "TableBetsClosedError";
    }
}


class WrongTurnBettingError extends Error{
    constructor(message){
        super(message);
        this.name = "WrongTurnBettingError";
    }
}

class NotAtTable extends Error {
    constructor(message){
        super(message);
        this.name = "NotAtTable";
    }
}


class EmptyTable extends Error {
    constructor(message){
        super(message);
        this.name = "EmptyTable";
    }
}



module.exports = {
    InsufficentChipsError,
    TableFullError,
    InvalidAmountError,
    TableBetsClosedError,
    WrongTurnBettingError,
    NotAtTable,
    EmptyTable
}