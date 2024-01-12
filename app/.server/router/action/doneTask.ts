import { z } from "zod";
import { db } from "~/.server/db";
import { authProcedure } from "~/.server/trpc";

export const doneTask = authProcedure
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async (ctx) => {
    const { taskId } = ctx.input;
    await db.task.update({ where: { id: taskId }, data: { done: true } });
  });
