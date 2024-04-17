import { authProcedure } from "~/.server/trpc";
import { Cookies } from "~/.server/cookies";
import { JWT_KEY, isProd } from "~/common/constant";

export const logout = authProcedure.mutation(async (ctx) => {
  // delete cookie to logout
  Cookies.delete(ctx.ctx.resHeaders, JWT_KEY, {
    maxAge: 0,
    httpOnly: true,
    secure: isProd,
    path: "/",
    sameSite: "lax",
  });
});
