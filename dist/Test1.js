"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
// Unit test: tests each Utils function on its own.
// Exit code 0 = all cases passed, 1 = at least one case failed.
const check = (name, ok) => {
    if (ok) {
        console.log(`Test case ${name} passed`);
    }
    else {
        console.log(`Test case ${name} failed`);
        process.exit(1);
    }
};
const unit_test = () => {
    check("1 add(2,2)", Utils_1.Utils.add(2, 2) === 4);
    check("2 add(3,3)", Utils_1.Utils.add(3, 3) === 6);
    check("3 trimText", Utils_1.Utils.trimText("  abc  ") === "abc");
    check("4 capitalize", Utils_1.Utils.capitalize("sOMchai") === "Somchai");
    check("5 toLower", Utils_1.Utils.toLower("ABC") === "abc");
    check("6 isValidEmail (valid)", Utils_1.Utils.isValidEmail("a@b.co") === true);
    check("7 isValidEmail (invalid)", Utils_1.Utils.isValidEmail("abc") === false);
};
unit_test();
