declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      VERSION: number;
      JWT_SECRET: string;
    }
  }
}

export {};
