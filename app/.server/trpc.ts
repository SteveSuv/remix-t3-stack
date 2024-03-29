import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { getUserInfo } from "./auth";

export const createContext = async (ctx: FetchCreateContextFnOptions) => {
  const userInfo = await getUserInfo(ctx.req);
  return { ...ctx, userInfo, userId: userInfo?.id };
};

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userInfo) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "please login" });
  }
  return next();
});

const isUnAuthed = t.middleware(({ ctx, next }) => {
  if (!!ctx.userInfo) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "you have already login",
    });
  }
  return next();
});

export const publicProcedure = t.procedure;
export const authProcedure = publicProcedure.use(isAuthed);
export const unAuthProcedure = publicProcedure.use(isUnAuthed);
