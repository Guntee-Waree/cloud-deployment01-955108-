"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("./UserService");
// Integration test: tests the UserService module, which combines several Utils functions.
// Exit code 0 = all cases passed, 1 = at least one case failed.
const integration_test = () => {
    // case 1: formatName -> Utils.trimText + Utils.capitalize
    if (UserService_1.UserService.formatName("  somchai ", " JAIDEE") === "Somchai Jaidee") {
        console.log("Integration case 1 passed: formatName -> Somchai Jaidee");
    }
    else {
        console.log("Integration case 1 failed: formatName expected 'Somchai Jaidee'");
        process.exit(1);
    }
    // case 2: createUsername -> Utils.trimText + Utils.toLower
    if (UserService_1.UserService.createUsername(" Somchai", "Jaidee ") === "sjaidee") {
        console.log("Integration case 2 passed: createUsername -> sjaidee");
    }
    else {
        console.log("Integration case 2 failed: createUsername expected 'sjaidee'");
        process.exit(1);
    }
    // case 3: registerUser (valid email) -> all Utils functions working together
    const user = UserService_1.UserService.registerUser("  somchai ", "JAIDEE", "  Somchai@CMU.ac.th ");
    const expected = { fullName: "Somchai Jaidee", username: "sjaidee", email: "somchai@cmu.ac.th" };
    if (JSON.stringify(user) === JSON.stringify(expected)) {
        console.log("Integration case 3 passed: registerUser -> " + JSON.stringify(user));
    }
    else {
        console.log("Integration case 3 failed: registerUser got " + JSON.stringify(user));
        process.exit(1);
    }
    // case 4: registerUser (invalid email) is rejected
    if (UserService_1.UserService.registerUser("Somchai", "Jaidee", "not-an-email") === null) {
        console.log("Integration case 4 passed: invalid email rejected");
    }
    else {
        console.log("Integration case 4 failed: invalid email was accepted");
        process.exit(1);
    }
};
integration_test();
