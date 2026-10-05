import { Utils } from "./Utils";
import { parseUserInput } from "./UserValidation";

// Unit test: tests each function on its own (Utils + user input validation).
// Exit code 0 = all cases passed, 1 = at least one case failed.
const check = (name: string, ok: boolean) => {
    if (ok) {
        console.log(`Test case ${name} passed`);
    } else {
        console.log(`Test case ${name} failed`);
        process.exit(1);
    }
};

const unit_test = () => {
    // Utils.add
    check("1 add(2,2)", Utils.add(2, 2) === 4);
    check("2 add(3,3)", Utils.add(3, 3) === 6);
    check("3 add negative", Utils.add(-1, 1) === 0);

    // Utils.trimText
    check("4 trimText", Utils.trimText("  abc  ") === "abc");
    check("5 trimText empty", Utils.trimText("   ") === "");

    // Utils.capitalize
    check("6 capitalize", Utils.capitalize("sOMchai") === "Somchai");
    check("7 capitalize empty", Utils.capitalize("") === "");
    check("8 capitalize one char", Utils.capitalize("a") === "A");

    // parseUserInput
    const ok = parseUserInput({ name: "  Somchai ", email: " Somchai@Example.com ", age: 20 });
    check("9 parseUserInput valid", ok !== null && ok.name === "Somchai"
        && ok.email === "somchai@example.com" && ok.age === 20);
    check("10 parseUserInput bad email", parseUserInput({ name: "A", email: "not-an-email" }) === null);
    check("11 parseUserInput negative age", parseUserInput({ name: "A", email: "a@b.co", age: -1 }) === null);
};

unit_test();
