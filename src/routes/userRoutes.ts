import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    patchUser
} from "../controllers/userController.js";
import validateInput from "../middlewares/validateInput.js";
import { userSchema, updateUserSchema } from "../schemas/userSchema.js";

const router = Router();

router.post("/", validateInput(userSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", validateInput(updateUserSchema), patchUser);
router.delete("/:id", deleteUser);

export default router;
