import { z } from "zod";
import { p } from "~/.server/common/trpc";
import { db } from "~/.server/db";

export const doneTask = p.auth
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async ({ input: { taskId } }) => {
    await db.task.update({ where: { id: taskId }, data: { done: true } });
  });
