import { p } from "~/.server/trpc";
import { Cookies } from "~/.server/cookies";
import { JWT_KEY } from "~/common/constants";

export const logout = p.auth.mutation(async ({ ctx: { resHeaders } }) => {
  // delete cookie to logout
  Cookies.delete(resHeaders, JWT_KEY);
});
