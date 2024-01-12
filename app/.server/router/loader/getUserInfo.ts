import { publicProcedure } from "~/.server/trpc";

export const getUserInfo = publicProcedure.query(async (ctx) => {
  // get userInfo from context
  const { userInfo } = ctx.ctx;

  return { userInfo };
});
