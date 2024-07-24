import { authProcedure } from "~/.server/trpc";
import { Cookies } from "~/.server/cookies";
import { JWT_KEY } from "~/common/constants";

export const logout = authProcedure.mutation(async (ctx) => {
  // delete cookie to logout
  Cookies.delete(ctx.ctx.resHeaders, JWT_KEY);
});
