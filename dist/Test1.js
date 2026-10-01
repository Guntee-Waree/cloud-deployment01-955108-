"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
// Unit test: prints 0 when every test passes, 1 when any test fails
// (the workflow reads this value as the exit code, as in the course slides)
const unit_test = () => {
    // test1
    if (Utils_1.Utils.add(2, 2) === 4) {
        console.log("Test case 1 passed");
    }
    else {
        console.log("Test case 1 failed");
        process.exit(1);
    }
    // test2
    if (Utils_1.Utils.add(3, 3) === 6) {
        console.log("Test case 2 passed");
    }
    else {
        console.log("Test case 2 failed");
        process.exit(1);
    }
    // test3
    if (Utils_1.Utils.multiply(3, 4) === 12) {
        console.log("Test case 3 passed");
    }
    else {
        console.log("Test case 3 failed");
        process.exit(1);
    }
    // test4
    if (Utils_1.Utils.divide(10, 2) === 5) {
        console.log("Test case 4 passed");
    }
    else {
        console.log("Test case 4 failed");
        process.exit(1);
    }
};
unit_test();
