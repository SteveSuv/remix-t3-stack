import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/.server/router";
import { createContext } from "~/.server/trpc";
import { Route } from "./+types/trpc.$trpc";

const handleRequest = (args: Route.LoaderArgs | Route.ActionArgs) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: args.request,
    router: appRouter,
    createContext,
  });
};

export const loader = (args: Route.LoaderArgs) => handleRequest(args);

export const action = (args: Route.ActionArgs) => handleRequest(args);
