export interface UserData {
    name: string;
    email: string;
    age?: number;
}

export interface UserInput {
    name?: unknown;
    email?: unknown;
    age?: unknown;
}

// Validate and normalize a request body. Returns null when invalid.
export function parseUserInput(body: UserInput): UserData | null {
    if (!body || typeof body !== "object") {
        return null;
    }
    if (typeof body.name !== "string" || !body.name.trim()) {
        return null;
    }
    if (typeof body.email !== "string" || !/^\S+@\S+\.\S+$/.test(body.email.trim())) {
        return null;
    }
    if (body.age !== undefined &&
        (typeof body.age !== "number" || !Number.isInteger(body.age) || body.age < 0)) {
        return null;
    }

    return {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        ...(body.age === undefined ? {} : { age: body.age })
    };
}
