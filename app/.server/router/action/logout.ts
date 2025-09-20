import { Cookies } from "~/.server/common/cookies";
import { p } from "~/.server/common/trpc";
import { JWT_KEY } from "~/common/constants";

export const logout = p.auth.mutation(async ({ ctx: { resHeaders } }) => {
  // delete cookie to logout
  Cookies.delete(resHeaders, JWT_KEY);
});
