interface Config {
    port: number;
    nodeEnv: string;
    jwt_secret: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    jwt_secret: process.env.JWT_TOKEN_SECRET || ""
};

export default config;
