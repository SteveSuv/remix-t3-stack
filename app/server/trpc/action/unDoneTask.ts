import { z } from "zod";
import { db } from "~/server/db.server";
import { authProcedure } from "~/server/trpc.server";

export const unDoneTask = authProcedure
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async (ctx) => {
    const { taskId } = ctx.input;
    await db.task.update({ where: { id: taskId }, data: { done: false } });
  });
