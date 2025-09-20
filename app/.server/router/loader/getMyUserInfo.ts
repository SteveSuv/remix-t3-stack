import { p } from "~/.server/common/trpc";

export const getMyUserInfo = p.public.query(async ({ ctx: { myUserInfo } }) => {
  // get myUserInfo from context
  return { myUserInfo };
});
