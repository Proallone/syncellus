import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    patchUser
} from "../controllers/user.controller.js";
import { validateInput } from "../middlewares/validator.middleware.js";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema.js";

const router = Router();

router.post("/", validateInput(userCreateSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", validateInput(userUpdateSchema), patchUser);
router.delete("/:id", deleteUser);

export default router;
