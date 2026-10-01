"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const Utils_1 = require("./Utils");
// "  somchai ", " JAIDEE" -> "Somchai Jaidee" (uses Utils.trimText + Utils.capitalize)
function formatName(firstName, lastName) {
    const first = Utils_1.Utils.capitalize(Utils_1.Utils.trimText(firstName));
    const last = Utils_1.Utils.capitalize(Utils_1.Utils.trimText(lastName));
    return `${first} ${last}`;
}
// first letter of first name + last name, lower case: "Somchai", "Jaidee" -> "sjaidee"
// (uses Utils.trimText + Utils.toLower)
function createUsername(firstName, lastName) {
    const first = Utils_1.Utils.trimText(firstName);
    const last = Utils_1.Utils.trimText(lastName);
    return Utils_1.Utils.toLower(first[0] + last);
}
// register a user from raw form input; returns null when the email is not valid
// (uses every function above + Utils.isValidEmail)
function registerUser(firstName, lastName, email) {
    const cleanEmail = Utils_1.Utils.toLower(Utils_1.Utils.trimText(email));
    if (!Utils_1.Utils.isValidEmail(cleanEmail)) {
        return null;
    }
    return {
        fullName: formatName(firstName, lastName),
        username: createUsername(firstName, lastName),
        email: cleanEmail
    };
}
exports.UserService = {
    formatName,
    createUsername,
    registerUser
};
