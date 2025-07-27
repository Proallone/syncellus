import { getDatabaseVersionFromDb } from "./repository.js";

const getApplicationStatus = () => {
    return `Healthy!`;
};

const getDatabaseVersion = async () => {
    const version = await getDatabaseVersionFromDb();
    return {
        status: "Healthy",
        ...version
    };
};

export { getApplicationStatus, getDatabaseVersion };
