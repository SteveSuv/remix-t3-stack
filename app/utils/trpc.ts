import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { AppRouter } from "~/.server/router";
import { isProd } from "./constant";

const devUrl = "http://localhost:3000/trpc";
const prodUrl = "http://localhost:3000/trpc"; // change to real domain when deploy to prod
const trpcUrl = isProd ? prodUrl : devUrl;

export const trpc = (request?: Request) => {
  return createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: trpcUrl,
        headers: () => {
          const cookie = request?.headers.get("Cookie") || "";
          return { cookie };
        },
      }),
    ],
  });
};
