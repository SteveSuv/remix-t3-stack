import { db } from "~/.server/db";
import { publicProcedure } from "~/.server/trpc";

export const getUserList = publicProcedure.query(async () => {
  const userList = await db.user.findMany({
    select: { id: true, username: true, createAt: true },
  });

  return { userList };
});
