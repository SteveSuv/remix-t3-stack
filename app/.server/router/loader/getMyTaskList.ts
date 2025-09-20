import { p } from "~/.server/common/trpc";
import { db } from "~/.server/db";

export const getMyTaskList = p.public.query(async ({ ctx: { userId } }) => {
  // get userId from context
  if (!userId) return { myTaskList: [] };

  const myTaskList = await db.task.findMany({
    where: { userId },
    orderBy: [{ createAt: "desc" }],
  });

  return { myTaskList };
});
