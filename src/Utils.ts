function hello() {
    console.log("Hello, world!");
}

function add(a: number, b: number): number {
    return a + b;
}

// remove spaces at both ends: "  abc  " -> "abc"
function trimText(text: string): string {
    return text.trim();
}

// first letter upper case, the rest lower case: "sOMchai" -> "Somchai"
function capitalize(text: string): string {
    if (text.length === 0) {
        return text;
    }
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

// true when text is missing, empty or only spaces: "   " -> true
function isBlank(text: unknown): boolean {
    return typeof text !== "string" || text.trim().length === 0;
}

// true when email is already in the list (ignores spaces and upper/lower case)
function isDuplicateEmail(email: string, existingEmails: string[]): boolean {
    const wanted = email.trim().toLowerCase();
    return existingEmails.some((e) => e.trim().toLowerCase() === wanted);
}

export const Utils = {
    hello,
    add,
    trimText,
    capitalize,
    isBlank,
    isDuplicateEmail
};
