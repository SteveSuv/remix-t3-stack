import { z } from "zod";
import { db } from "~/server/db.server";
import { authProcedure } from "~/server/trpc.server";

export const addTask = authProcedure
  .input(
    z.object({
      content: z.string().min(1).max(100),
    }),
  )
  .mutation(async (ctx) => {
    const { content } = ctx.input;
    const { userId } = ctx.ctx;
    userId && (await db.task.create({ data: { content, userId } }));
  });
