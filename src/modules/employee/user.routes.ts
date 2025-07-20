import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    patchUser
} from "./user.controller.js";
import { validateInput } from "../../middlewares/validator.middleware.js";
import { userPostSchema, userPatchSchema } from "./user.schema.js";

const router = Router();

router.post("/", validateInput(userPostSchema), createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", validateInput(userPatchSchema), patchUser);
router.delete("/:id", deleteUser);

export default router;
