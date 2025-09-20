import { z } from "zod";
import { p } from "~/.server/common/trpc";
import { db } from "~/.server/db";

export const deleteTask = p.auth
  .input(
    z.object({
      taskId: z.string(),
    }),
  )
  .mutation(async ({ input: { taskId } }) => {
    await db.task.delete({ where: { id: taskId } });
  });
