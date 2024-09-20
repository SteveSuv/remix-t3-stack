namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CRYPTO_SECRET: string;
  }
}

declare module "@remix-run/node" {
  interface Future {
    unstable_singleFetch: true;
  }
}
