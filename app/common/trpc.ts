import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { AppRouter } from "~/.server/router";
import { IS_PROD } from "./constants";

const DEV_TRPC_URL = "http://localhost:3000/trpc";

// change to your real domain when deploy to prod
const PROD_TRPC_URL = "http://localhost:3000/trpc";

const TRPC_URL = IS_PROD ? PROD_TRPC_URL : DEV_TRPC_URL;

// use trpcServer to fetch in server environment, like in loader, for passing cookies to trpc endpoint
export const trpcServer = (request?: Request) => {
  return createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: TRPC_URL,
        headers: () => {
          const cookie = request?.headers.get("Cookie") || "";
          return { cookie };
        },
      }),
    ],
  });
};

// use trpcClient to fetch in frontend environment, like in react component, cookies will be passing to trpc endpoint automatically
export const trpcClient = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: TRPC_URL,
    }),
  ],
});
