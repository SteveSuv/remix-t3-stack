import { db } from "~/.server/db";
import { publicProcedure } from "~/.server/trpc";

export const getMyTaskList = publicProcedure.query(async (ctx) => {
  // get userId from context
  const { userId } = ctx.ctx;

  const myTaskList = userId
    ? await db.task.findMany({ where: { userId } })
    : [];

  return { myTaskList };
});
