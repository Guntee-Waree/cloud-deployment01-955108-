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

    // Utils.isBlank (email must not be empty)
    check("20 isBlank empty", Utils.isBlank("") === true);
    check("21 isBlank spaces", Utils.isBlank("   ") === true);
    check("22 isBlank undefined", Utils.isBlank(undefined) === true);
    check("23 isBlank text", Utils.isBlank(" a ") === false);

    // Utils.isDuplicateEmail
    check("24 isDuplicateEmail same", Utils.isDuplicateEmail("a@b.co", ["x@y.io", "a@b.co"]) === true);
    check("25 isDuplicateEmail case + spaces", Utils.isDuplicateEmail(" A@B.CO ", ["a@b.co"]) === true);
    check("26 isDuplicateEmail new email", Utils.isDuplicateEmail("new@b.co", ["a@b.co"]) === false);
    check("27 isDuplicateEmail empty list", Utils.isDuplicateEmail("a@b.co", []) === false);

    // parseUserInput
    const ok = parseUserInput({ name: "  Somchai ", email: " Somchai@Example.com ", age: 20 });
    check("9 parseUserInput valid", ok !== null && ok.name === "Somchai"
        && ok.email === "somchai@example.com" && ok.age === 20);
    const noAge = parseUserInput({ name: "Jaidee", email: "j@x.io" });
    check("10 parseUserInput age optional", noAge !== null && !("age" in noAge));
    check("11 parseUserInput age zero ok", parseUserInput({ name: "A", email: "a@b.co", age: 0 })?.age === 0);
    check("12 parseUserInput missing name", parseUserInput({ email: "a@b.co" }) === null);
    check("13 parseUserInput blank name", parseUserInput({ name: "   ", email: "a@b.co" }) === null);
    check("14 parseUserInput bad email", parseUserInput({ name: "A", email: "not-an-email" }) === null);
    check("15 parseUserInput missing email", parseUserInput({ name: "A" }) === null);
    check("16 parseUserInput negative age", parseUserInput({ name: "A", email: "a@b.co", age: -1 }) === null);
    check("17 parseUserInput float age", parseUserInput({ name: "A", email: "a@b.co", age: 1.5 }) === null);
    check("18 parseUserInput string age", parseUserInput({ name: "A", email: "a@b.co", age: "20" }) === null);
    check("19 parseUserInput undefined body", parseUserInput(undefined as any) === null);
};

unit_test();
