import { db } from "~/.server/db";
import { p } from "~/.server/trpc";
import { addTaskFormSchema } from "~/common/formSchema";

export const addTask = p.auth
  .input(addTaskFormSchema)
  .mutation(async ({ ctx: { userId }, input: { content } }) => {
    if (!userId) return;
    await db.task.create({ data: { content, userId } });
  });
