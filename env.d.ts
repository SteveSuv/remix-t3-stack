/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      CRYPTO_SECRET: string;
    }
  }
}

export {};
