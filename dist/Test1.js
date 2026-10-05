"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const UserValidation_1 = require("./UserValidation");
// Unit test: tests each function on its own (Utils + user input validation).
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
    var _a;
    // Utils.add
    check("1 add(2,2)", Utils_1.Utils.add(2, 2) === 4);
    check("2 add(3,3)", Utils_1.Utils.add(3, 3) === 6);
    check("3 add negative", Utils_1.Utils.add(-1, 1) === 0);
    // Utils.trimText
    check("4 trimText", Utils_1.Utils.trimText("  abc  ") === "abc");
    check("5 trimText empty", Utils_1.Utils.trimText("   ") === "");
    // Utils.capitalize
    check("6 capitalize", Utils_1.Utils.capitalize("sOMchai") === "Somchai");
    check("7 capitalize empty", Utils_1.Utils.capitalize("") === "");
    check("8 capitalize one char", Utils_1.Utils.capitalize("a") === "A");
    // Utils.isBlank (email must not be empty)
    check("20 isBlank empty", Utils_1.Utils.isBlank("") === true);
    check("21 isBlank spaces", Utils_1.Utils.isBlank("   ") === true);
    check("22 isBlank undefined", Utils_1.Utils.isBlank(undefined) === true);
    check("23 isBlank text", Utils_1.Utils.isBlank(" a ") === false);
    // Utils.isDuplicateEmail
    check("24 isDuplicateEmail same", Utils_1.Utils.isDuplicateEmail("a@b.co", ["x@y.io", "a@b.co"]) === true);
    check("25 isDuplicateEmail case + spaces", Utils_1.Utils.isDuplicateEmail(" A@B.CO ", ["a@b.co"]) === true);
    check("26 isDuplicateEmail new email", Utils_1.Utils.isDuplicateEmail("new@b.co", ["a@b.co"]) === false);
    check("27 isDuplicateEmail empty list", Utils_1.Utils.isDuplicateEmail("a@b.co", []) === false);
    // parseUserInput
    const ok = (0, UserValidation_1.parseUserInput)({ name: "  Somchai ", email: " Somchai@Example.com ", age: 20 });
    check("9 parseUserInput valid", ok !== null && ok.name === "Somchai"
        && ok.email === "somchai@example.com" && ok.age === 20);
    const noAge = (0, UserValidation_1.parseUserInput)({ name: "Jaidee", email: "j@x.io" });
    check("10 parseUserInput age optional", noAge !== null && !("age" in noAge));
    check("11 parseUserInput age zero ok", ((_a = (0, UserValidation_1.parseUserInput)({ name: "A", email: "a@b.co", age: 0 })) === null || _a === void 0 ? void 0 : _a.age) === 0);
    check("12 parseUserInput missing name", (0, UserValidation_1.parseUserInput)({ email: "a@b.co" }) === null);
    check("13 parseUserInput blank name", (0, UserValidation_1.parseUserInput)({ name: "   ", email: "a@b.co" }) === null);
    check("14 parseUserInput bad email", (0, UserValidation_1.parseUserInput)({ name: "A", email: "not-an-email" }) === null);
    check("15 parseUserInput missing email", (0, UserValidation_1.parseUserInput)({ name: "A" }) === null);
    check("16 parseUserInput negative age", (0, UserValidation_1.parseUserInput)({ name: "A", email: "a@b.co", age: -1 }) === null);
    check("17 parseUserInput float age", (0, UserValidation_1.parseUserInput)({ name: "A", email: "a@b.co", age: 1.5 }) === null);
    check("18 parseUserInput string age", (0, UserValidation_1.parseUserInput)({ name: "A", email: "a@b.co", age: "20" }) === null);
    check("19 parseUserInput undefined body", (0, UserValidation_1.parseUserInput)(undefined) === null);
};
unit_test();
