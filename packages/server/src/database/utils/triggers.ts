import { sql } from "kysely";

/**
 * Creates a reusable function and trigger to automatically update a `modified_at`
 * column on any table.
 *
 * @param schemaName - The database schema name (e.g., 'auth', 'workspaces').
 * @param tableName - The name of the table to apply the trigger to.
 */
export const createUpdateTimestampTrigger = (schemaName: string, tableName: string) => {
    const functionName = `${tableName}_update_timestamp`;

    const triggerName = `${tableName}_update_timestamp_trigger`;

    return sql`
        CREATE OR REPLACE FUNCTION ${sql.id(functionName)}()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.modified_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE TRIGGER ${sql.id(triggerName)}
        BEFORE UPDATE ON ${sql.id(schemaName, tableName)}
        FOR EACH ROW
        EXECUTE FUNCTION ${sql.id(functionName)}();
    `;
};
