"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Calculator_1 = require("./Calculator");
// Integration test: tests the Calculator module, which combines several Utils functions.
// Exit code 0 = all cases passed, 1 = at least one case failed.
const integration_test = () => {
    // case 1: sum -> Utils.add used repeatedly
    if (Calculator_1.Calculator.sum([1, 2, 3, 4]) === 10) {
        console.log("Integration case 1 passed: sum([1,2,3,4]) = 10");
    }
    else {
        console.log("Integration case 1 failed: sum([1,2,3,4]) expected 10");
        process.exit(1);
    }
    // case 2: average -> Utils.add (through sum) + Utils.divide
    if (Calculator_1.Calculator.average([2, 4, 6]) === 4) {
        console.log("Integration case 2 passed: average([2,4,6]) = 4");
    }
    else {
        console.log("Integration case 2 failed: average([2,4,6]) expected 4");
        process.exit(1);
    }
    // case 3: totalWithTax -> Utils.multiply + Utils.divide + Utils.add
    if (Calculator_1.Calculator.totalWithTax(100, 2, 10) === 220) {
        console.log("Integration case 3 passed: totalWithTax(100,2,10) = 220");
    }
    else {
        console.log("Integration case 3 failed: totalWithTax(100,2,10) expected 220");
        process.exit(1);
    }
};
integration_test();
