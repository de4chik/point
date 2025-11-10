declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      VERSION: number;
    }
  }
}

export {};
