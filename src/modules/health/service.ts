import { getDatabaseHealthDb } from "./repository.js";

const getApplicationStatus = () => {
    return `Healthy!`;
};

const getDatabaseVersion = async () => {
    const version = await getDatabaseHealthDb();
    return { status: "Healthy", ...version };
};

export { getApplicationStatus, getDatabaseVersion };
