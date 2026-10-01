import { Utils } from "./Utils";

// Greeting module: combines 2 Utils functions (trimText + capitalize).
// "  somchai " -> "Hello, Somchai!"
function greet(name: string): string {
    const cleanName = Utils.capitalize(Utils.trimText(name));
    return `Hello, ${cleanName}!`;
}

export const Greeting = {
    greet
};
