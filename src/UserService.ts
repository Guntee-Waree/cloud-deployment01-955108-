import { Utils } from "./Utils";

// UserService module: combines several Utils functions (trimText, capitalize, toLower, isValidEmail).
// Each Utils function has its own unit test; the integration test checks they work together.

export interface User {
    fullName: string;
    username: string;
    email: string;
}

// "  somchai ", " JAIDEE" -> "Somchai Jaidee" (uses Utils.trimText + Utils.capitalize)
function formatName(firstName: string, lastName: string): string {
    const first = Utils.capitalize(Utils.trimText(firstName));
    const last = Utils.capitalize(Utils.trimText(lastName));
    return `${first} ${last}`;
}

// first letter of first name + last name, lower case: "Somchai", "Jaidee" -> "sjaidee"
// (uses Utils.trimText + Utils.toLower)
function createUsername(firstName: string, lastName: string): string {
    const first = Utils.trimText(firstName);
    const last = Utils.trimText(lastName);
    return Utils.toLower(first[0] + last);
}

// register a user from raw form input; returns null when the email is not valid
// (uses every function above + Utils.isValidEmail)
function registerUser(firstName: string, lastName: string, email: string): User | null {
    const cleanEmail = Utils.toLower(Utils.trimText(email));
    if (!Utils.isValidEmail(cleanEmail)) {
        return null;
    }
    return {
        fullName: formatName(firstName, lastName),
        username: createUsername(firstName, lastName),
        email: cleanEmail
    };
}

export const UserService = {
    formatName,
    createUsername,
    registerUser
};
