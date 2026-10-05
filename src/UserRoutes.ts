import { Router } from "express";
import {
	createUser,
	deleteUserById,
	getAllUsers,
	getUserById,
	updateUserById
} from "./UserController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export = router;
