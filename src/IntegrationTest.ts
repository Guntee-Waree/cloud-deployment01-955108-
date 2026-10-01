import { Greeting } from "./Greeting";

// Integration test: tests the Greeting module, which combines Utils.trimText + Utils.capitalize.
// Exit code 0 = all cases passed, 1 = at least one case failed.
const integration_test = () => {
    // case 1: spaces + lower case
    if (Greeting.greet("  somchai ") === "Hello, Somchai!") {
        console.log("Integration case 1 passed: greet('  somchai ') -> Hello, Somchai!");
    } else {
        console.log("Integration case 1 failed: expected 'Hello, Somchai!'");
        process.exit(1);
    }

    // case 2: upper case
    if (Greeting.greet("JAIDEE") === "Hello, Jaidee!") {
        console.log("Integration case 2 passed: greet('JAIDEE') -> Hello, Jaidee!");
    } else {
        console.log("Integration case 2 failed: expected 'Hello, Jaidee!'");
        process.exit(1);
    }
};

integration_test();
