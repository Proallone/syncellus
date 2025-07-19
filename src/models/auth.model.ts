import db from "../database/database.js";

export interface Auth {
    email: string;
    password: string;
}

const getUserAuth = (email: string) => {
    const query = db.prepare(
        "SELECT email, passwordHash FROM USERS where email = ?;"
    );
    return query.get(email);
};

export { getUserAuth };
