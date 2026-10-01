import { Utils } from "./Utils";

// Greeting module: combines 2 Utils functions (trimText + capitalize).
// "  somchai " -> "Hello, Somchai!"
function greet(name: string): string {
    // BUG (intentional, for the red integration test): forgot to call Utils.capitalize
    const cleanName = Utils.trimText(name);
    return `Hello, ${cleanName}!`;
}

export const Greeting = {
    greet
};
