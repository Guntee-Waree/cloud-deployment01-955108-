"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const Utils_1 = require("./Utils");
// Calculator module: combines several Utils functions (add, multiply, divide).
// Each Utils function has its own unit test; the integration test checks they work together.
// sum of all numbers (uses Utils.add)
function sum(numbers) {
    let total = 0;
    for (const n of numbers) {
        total = Utils_1.Utils.add(total, n);
    }
    return total;
}
// average = sum / count (uses sum -> Utils.add, then Utils.divide)
function average(numbers) {
    return Utils_1.Utils.divide(sum(numbers), numbers.length);
}
// price * quantity, plus tax given in percent (uses Utils.multiply, Utils.divide, Utils.add)
function totalWithTax(price, quantity, taxPercent) {
    const subtotal = Utils_1.Utils.multiply(price, quantity);
    const tax = Utils_1.Utils.divide(Utils_1.Utils.multiply(subtotal, taxPercent), 100);
    return Utils_1.Utils.add(subtotal, tax);
}
exports.Calculator = {
    sum,
    average,
    totalWithTax
};
