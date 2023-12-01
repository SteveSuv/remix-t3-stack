import { db } from "~/server/db.server";
import { publicProcedure } from "~/server/trpc.server";

export const getUserList = publicProcedure.query(async () => {
  const userList = await db.user.findMany({
    select: { id: true, username: true, createAt: true },
  });

  return { userList };
});
