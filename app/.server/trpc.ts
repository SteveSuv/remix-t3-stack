import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import SuperJSON from "superjson";
import { getMyUserInfo } from "./auth";

export const createContext = async (ctx: FetchCreateContextFnOptions) => {
  const myUserInfo = await getMyUserInfo(ctx.req);
  return { ...ctx, myUserInfo, userId: myUserInfo?.id };
};

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.myUserInfo) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "please login" });
  }
  return next();
});

const isUnAuthed = t.middleware(({ ctx, next }) => {
  if (!!ctx.myUserInfo) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "you have already login",
    });
  }
  return next();
});

const publicProcedure = t.procedure;
const authProcedure = publicProcedure.use(isAuthed);
const unAuthProcedure = publicProcedure.use(isUnAuthed);

export const p = {
  public: publicProcedure,
  auth: authProcedure,
  unAuth: unAuthProcedure,
};
