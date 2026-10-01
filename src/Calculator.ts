import { Utils } from "./Utils";

// Calculator module: combines several Utils functions (add, multiply, divide).
// Each Utils function has its own unit test; the integration test checks they work together.

// sum of all numbers (uses Utils.add)
function sum(numbers: number[]): number {
    let total = 0;
    for (const n of numbers) {
        total = Utils.add(total, n);
    }
    return total;
}

// average = sum / count (uses sum -> Utils.add, then Utils.divide)
function average(numbers: number[]): number {
    return Utils.divide(sum(numbers), numbers.length);
}

// price * quantity, plus tax given in percent (uses Utils.multiply, Utils.divide, Utils.add)
function totalWithTax(price: number, quantity: number, taxPercent: number): number {
    const subtotal = Utils.multiply(price, quantity);
    const tax = Utils.divide(Utils.multiply(subtotal, taxPercent), 100);
    return Utils.add(subtotal, tax);
}

export const Calculator = {
    sum,
    average,
    totalWithTax
};
