import { TRPCError } from "@trpc/server";
import { encrypt } from "~/.server/common/crypto";
import { p } from "~/.server/common/trpc";
import { db } from "~/.server/db";
import { registerFormSchema } from "~/common/formSchema";

export const register = p.unAuth
  .input(registerFormSchema)
  .mutation(async ({ input: { username, password } }) => {
    const user = await db.user.findUnique({ where: { username } });

    // if username exist, throw error
    if (!!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "invalid username",
      });
    }

    // if user not exist, create user
    await db.user.create({
      data: { username, password: encrypt(password) },
    });
  });
