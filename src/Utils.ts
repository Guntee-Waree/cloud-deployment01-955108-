function hello() {
    console.log("Hello, world!");
}

function add(a: number, b: number): number {
    return a + b;
}

// remove spaces at both ends
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

function toLower(text: string): string {
    return text.toLowerCase();
}

// simple check: something@something.something, no spaces
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const Utils = {
    hello,
    add,
    trimText,
    capitalize,
    toLower,
    isValidEmail
};
