import { getDatabaseVersionFromDb } from "@syncellus/modules/health/repository.ts";

export const getApplicationStatus = async () => {
	return await { status: "Healthy" };
};

export const getDatabaseStatus = async () => {
	const version = await getDatabaseVersionFromDb();

	return {
		status: "Healthy",
		postgres_version: version.postgres_version,
	};
};
