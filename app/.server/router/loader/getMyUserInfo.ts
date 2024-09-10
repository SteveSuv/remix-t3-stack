import { p } from "~/.server/trpc";

export const getMyUserInfo = p.public.query(async ({ ctx: { myUserInfo } }) => {
  // get myUserInfo from context
  return { myUserInfo };
});
