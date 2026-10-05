	import { Request, Response } from "express";
	import { Collection, Db, MongoClient, ObjectId } from "mongodb";
	import dotenv = require("dotenv");
	import { parseUserInput, UserInput } from "./UserValidation";

	dotenv.config();

	export interface User {
		_id?: ObjectId;
		name: string;
		email: string;
		age?: number;
	}

	let users: Collection<User> | undefined;

	const getUsersCollection = async (): Promise<Collection<User>> => {
		if (users) {
			return users;
		}

		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error("MONGODB_URI is not configured");
		}

		const client = new MongoClient(uri);
		await client.connect();
		const database: Db = client.db(process.env.MONGODB_DB || "cloud_deployment");
		users = database.collection<User>("users");
		await users.createIndex({ email: 1 }, { unique: true });
		return users;
	};

	const getId = (req: Request): string | null => {
		const id = req.params.id;
		return typeof id === "string" ? id : null;
	};

	export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
		try {
			const collection = await getUsersCollection();
			res.json(await collection.find().sort({ name: 1 }).toArray());
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to fetch users" });
		}
	};

	export const getUserById = async (req: Request, res: Response): Promise<void> => {
		const id = getId(req);
		if (!id || !ObjectId.isValid(id)) {
			res.status(400).json({ message: "Invalid user id" });
			return;
		}

		try {
			const collection = await getUsersCollection();
			const user = await collection.findOne({ _id: new ObjectId(id) });
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to fetch user" });
		}
	};

	export const createUser = async (req: Request, res: Response): Promise<void> => {
		const user = parseUserInput(req.body as UserInput);
		if (!user) {
			res.status(400).json({ message: "name and valid email are required; age must be a non-negative integer" });
			return;
		}

		try {
			const collection = await getUsersCollection();
			const result = await collection.insertOne(user);
			res.status(201).json({ _id: result.insertedId, ...user });
		} catch (error: unknown) {
			if (error && typeof error === "object" && "code" in error && error.code === 11000) {
				res.status(409).json({ message: "Email already exists" });
				return;
			}
			console.error(error);
			res.status(500).json({ message: "Failed to create user" });
		}
	};

	export const updateUserById = async (req: Request, res: Response): Promise<void> => {
		const id = getId(req);
		if (!id || !ObjectId.isValid(id)) {
			res.status(400).json({ message: "Invalid user id" });
			return;
		}

		const user = parseUserInput(req.body as UserInput);
		if (!user) {
			res.status(400).json({ message: "name and valid email are required; age must be a non-negative integer" });
			return;
		}

		try {
			const collection = await getUsersCollection();
			const result = await collection.findOneAndUpdate(
				{ _id: new ObjectId(id) },
				{ $set: user },
				{ returnDocument: "after" }
			);
			if (!result) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.json(result);
		} catch (error: unknown) {
			if (error && typeof error === "object" && "code" in error && error.code === 11000) {
				res.status(409).json({ message: "Email already exists" });
				return;
			}
			console.error(error);
			res.status(500).json({ message: "Failed to update user" });
		}
	};

	export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
		const id = getId(req);
		if (!id || !ObjectId.isValid(id)) {
			res.status(400).json({ message: "Invalid user id" });
			return;
		}

		try {
			const collection = await getUsersCollection();
			const result = await collection.deleteOne({ _id: new ObjectId(id) });
			if (result.deletedCount === 0) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			res.status(204).send();
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to delete user" });
		}
	};
    