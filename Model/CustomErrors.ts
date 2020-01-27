export class InsufficentChipsError extends Error{
    constructor(message){
        super(message);
        this.name = "InsufficentChipsError"
    }
}

export class TableFullError extends Error{
    constructor(message){
        super(message);
        this.name = "TableFullError";
    }
}

export class InvalidAmountError extends Error{
    constructor(message){
        super(message);
        this.name = "InvalidAmountError";
    }
}


export class TableBetsClosedError extends Error{
    constructor(message){
        super(message);
        this.name = "TableBetsClosedError";
    }
}