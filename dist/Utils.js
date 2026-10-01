"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
function hello() {
    console.log("Hello, world!");
}
function add(a, b) {
    return a + b;
}
// remove spaces at both ends: "  abc  " -> "abc"
function trimText(text) {
    return text.trim();
}
// first letter upper case, the rest lower case: "sOMchai" -> "Somchai"
function capitalize(text) {
    if (text.length === 0) {
        return text;
    }
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}
exports.Utils = {
    hello,
    add,
    trimText,
    capitalize
};
