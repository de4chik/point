declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            VERSION: number;
            JWT_SECRET: string;
            SERVER_URL: string;
            SERVER_STATIC_URL: string;
            CLIENT_URL: string;
        }
    }
}

export {};
