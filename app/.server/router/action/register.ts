import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { encrypt } from "~/.server/crypto";
import { db } from "~/.server/db";
import { unAuthProcedure } from "~/.server/trpc";

export const register = unAuthProcedure
  .input(
    z.object({
      username: z.string().min(3).max(20),
      password: z.string().min(3).max(20),
    }),
  )
  .mutation(async (ctx) => {
    const { username, password } = ctx.input;
    const user = await db.user.findUnique({ where: { username } });

    // if username exist, throw error
    if (!!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "invalid username",
      });
    }

    // if user not exist, create user
    const newUser = await db.user.create({
      data: { username, password: encrypt(password) },
    });

    return { userId: newUser.id };
  });
