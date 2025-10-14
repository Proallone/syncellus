export type DbCredentials = {
  protocol: string;
  user: string;
  password?: string; // Password is optional
  host: string;
  port: number | null; // Port can be null if not specified
  database: string;
};

/**
 * Extracts database credentials from a PostgreSQL connection string.
 *
 * @param connectionString The full database connection URL string.
 * @returns A DbCredentials object containing the parsed components, or null if the string is invalid.
 */
export function extractDbCredentials(
  connectionString: string,
): DbCredentials | null {
  try {
    const url = new URL(connectionString);

    if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
      console.error(
        "Invalid protocol. Only 'postgres:' or 'postgresql:' are supported.",
      );
      return null;
    }

    const user = url.username;
    const password = url.password || undefined; // Use undefined if password is not present
    const host = url.hostname;
    // The port comes as a string, convert it to a number.
    const port = url.port ? parseInt(url.port, 10) : null;

    const database = url.pathname.substring(1);

    if (!user || !host || !database) {
      console.error(
        "Connection string is missing required components (username, host, or database name).",
      );
      return null;
    }

    return {
      protocol: url.protocol.replace(":", ""),
      user,
      password,
      host,
      port,
      database,
    };
  } catch (error) {
    console.error("Failed to parse the connection string:", error);
    return null;
  }
}
