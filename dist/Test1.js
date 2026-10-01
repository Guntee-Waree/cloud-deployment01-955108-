"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
// Unit test: prints 0 when every test passes, 1 when any test fails
// (the workflow reads this value as the exit code, as in the course slides)
const unit_test = () => {
    // test1
    if (Utils_1.Utils.add(1, 2) !== 3) {
        console.log(1);
        return;
    }
    // test2
    if (Utils_1.Utils.helloworld() !== "hello world") {
        console.log(1);
        return;
    }
    console.log(0);
};
unit_test();
