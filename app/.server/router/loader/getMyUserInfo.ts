import { publicProcedure } from "~/.server/trpc";

export const getMyUserInfo = publicProcedure.query(async (ctx) => {
  // get myUserInfo from context
  const { myUserInfo } = ctx.ctx;

  return { myUserInfo };
});
