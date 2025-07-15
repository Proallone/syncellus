import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/userController.js";
import validateInput from "../middlewares/validateInput.js";
import { userSchema } from "../schemas/userSchema.js";

const router = Router();

router.post("/", validateInput(userSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById)

export default router;
