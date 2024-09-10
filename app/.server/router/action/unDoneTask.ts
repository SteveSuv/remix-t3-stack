import { z } from "zod";
import { db } from "~/.server/db";
import { p } from "~/.server/trpc";

export const unDoneTask = p.auth
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async ({ input: { taskId } }) => {
    await db.task.update({ where: { id: taskId }, data: { done: false } });
  });
