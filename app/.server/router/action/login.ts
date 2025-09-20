import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { Cookies } from "~/.server/common/cookies";
import { encrypt } from "~/.server/common/crypto";
import { p } from "~/.server/common/trpc";
import { db } from "~/.server/db";
import { COOKIE_MAX_AGE, JWT_KEY } from "~/common/constants";
import { loginFormSchema } from "~/common/formSchema";

export const login = p.unAuth
  .input(loginFormSchema)
  .mutation(async ({ ctx: { resHeaders }, input: { username, password } }) => {
    const user = await db.user.findFirst({
      where: { username },
    });

    // if user not exist, throw error
    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "user not exist",
      });
    }

    // if user's password is not correct, throw error
    if (user.password !== encrypt(password)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "wrong username or password",
      });
    }

    // if user exist, sign jwt token to cookie
    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: COOKIE_MAX_AGE,
    });

    Cookies.set(resHeaders, JWT_KEY, jwtToken);
  });
