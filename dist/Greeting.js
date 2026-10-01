"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greeting = void 0;
const Utils_1 = require("./Utils");
// Greeting module: combines 2 Utils functions (trimText + capitalize).
// "  somchai " -> "Hello, Somchai!"
function greet(name) {
    const cleanName = Utils_1.Utils.capitalize(Utils_1.Utils.trimText(name));
    return `Hello, ${cleanName}!`;
}
exports.Greeting = {
    greet
};
