export const IS_PROD = import.meta.env.PROD;
export const JWT_KEY = "ACCESS_TOKEN";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const DEV_TRPC_URL = "http://localhost:3000/trpc";

// change to your real domain when deploy to prod
const PROD_TRPC_URL = "http://localhost:3000/trpc";

export const TRPC_URL = IS_PROD ? PROD_TRPC_URL : DEV_TRPC_URL;
