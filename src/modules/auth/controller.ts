import { Request, Response, NextFunction } from "express";
import { Auth } from "./repository.js";
import { getUserAuth } from "./repository.js";
import { compareHash } from "../../utils/crypto.js";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    // const { body } = req;
    // const credentials: Auth = { ...body };
    // try {
    //     const user = getUserAuth(credentials.email);
    //     if (!user) {
    //         res.status(404).send({
    //             message: `User ${credentials.email} not found!`
    //         });
    //         return;
    //     }
    //     const match = await compareHash(
    //         credentials.password,
    //         String(user.passwordHash)
    //     );
    //     if (match) {
    //         res.status(200).send({
    //             message: "Correct password! This is a placeholder!"
    //         });
    //         return;
    //     }
    //     res.status(401).send({ message: "Unauthorized!" });
    // } catch (error) {
    //     next(error);
    // }
};

export { signIn };
