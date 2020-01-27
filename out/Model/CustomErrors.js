"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InsufficentChipsError extends Error {
    constructor(message) {
        super(message);
        this.name = "InsufficentChipsError";
    }
}
exports.InsufficentChipsError = InsufficentChipsError;
class TableFullError extends Error {
    constructor(message) {
        super(message);
        this.name = "TableFullError";
    }
}
exports.TableFullError = TableFullError;
class InvalidAmountError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidAmountError";
    }
}
exports.InvalidAmountError = InvalidAmountError;
class TableBetsClosedError extends Error {
    constructor(message) {
        super(message);
        this.name = "TableBetsClosedError";
    }
}
exports.TableBetsClosedError = TableBetsClosedError;
//# sourceMappingURL=CustomErrors.js.map