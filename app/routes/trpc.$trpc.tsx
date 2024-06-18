import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  unstable_defineLoader as defineLoader,
  unstable_defineAction as defineAction,
} from "@remix-run/node";
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

export const loader = defineLoader((args) => handleRequest(args));

export const action = defineAction((args) => handleRequest(args));
