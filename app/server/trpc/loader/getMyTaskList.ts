import { db } from "~/server/db.server";
import { publicProcedure } from "~/server/trpc.server";

export const getMyTaskList = publicProcedure.query(async (ctx) => {
  // get userId from context
  const { userId } = ctx.ctx;

  const myTaskList = userId
    ? await db.task.findMany({ where: { userId } })
    : [];

  return { myTaskList };
});
