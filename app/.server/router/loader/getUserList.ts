import { p } from "~/.server/common/trpc";
import { db } from "~/.server/db";

export const getUserList = p.public.query(async () => {
  const userList = await db.user.findMany({
    select: { id: true, username: true, createAt: true },
  });

  return { userList };
});
