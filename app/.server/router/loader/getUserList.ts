import { db } from "~/.server/db";
import { p } from "~/.server/trpc";

export const getUserList = p.public.query(async () => {
  const userList = await db.user.findMany({
    select: { id: true, username: true, createAt: true },
  });

  return { userList };
});
