import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "~/.server/db";
import { unAuthProcedure } from "~/.server/trpc";
import { Cookies } from "~/.server/cookies";
import { JWT_KEY, isProd, maxAge } from "~/utils/constant";
import { hash } from "~/.server/crypto";

export const login = unAuthProcedure
  .input(
    z.object({
      username: z.string().min(3).max(20),
      password: z.string().min(3).max(20),
    }),
  )
  .mutation(async (ctx) => {
    const { username, password } = ctx.input;

    const user = await db.user.findFirst({
      where: { username, password: hash(password) },
    });

    // if user not exist, throw error
    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "wrong username or password",
      });
    }

    // if user exist, sign jwt token to cookie
    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });

    const referer = ctx.ctx.req.referrer || "/";

    Cookies.set(ctx.ctx.resHeaders, JWT_KEY, jwtToken, {
      maxAge,
      httpOnly: true,
      secure: isProd,
      path: "/",
      sameSite: "lax",
    });

    return { userId: user.id, referer };
  });
