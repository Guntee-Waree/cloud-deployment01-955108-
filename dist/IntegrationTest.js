"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Greeting_1 = require("./Greeting");
const integration_test = () => {
    // case 1: spaces + lower case
    if (Greeting_1.Greeting.greet("  somchai ") === "Hello, Somchai!") {
        console.log("Integration case 1 passed: greet('  somchai ') -> Hello, Somchai!");
    }
    else {
        console.log("Integration case 1 failed: expected 'Hello, Somchai!'");
        process.exit(1);
    }
    // case 2: upper case
    if (Greeting_1.Greeting.greet("JAIDEE") === "Hello, Jaidee!") {
        console.log("Integration case 2 passed: greet('JAIDEE') -> Hello, Jaidee!");
    }
    else {
        console.log("Integration case 2 failed: expected 'Hello, Jaidee!'");
        process.exit(1);
    }
};
integration_test();
