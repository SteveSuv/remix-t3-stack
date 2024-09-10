import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "~/.server/router";
import { createContext } from "~/.server/trpc";

const handleRequest = (args: LoaderFunctionArgs | ActionFunctionArgs) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: args.request,
    router: appRouter,
    createContext,
  });
};

export const loader = (args: LoaderFunctionArgs) => handleRequest(args);

export const action = (args: LoaderFunctionArgs) => handleRequest(args);
