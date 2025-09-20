import jwt from "jsonwebtoken";
import { Cookies } from "~/.server/common/cookies";
import { db } from "~/.server/db";
import { JWT_KEY } from "~/common/constants";

export type IMyUserInfo = {
  id: string;
  username: string;
} | null;

export const getMyUserInfo = async (request: Request) => {
  const token = Cookies.get(request, JWT_KEY);

  if (!token) return null;

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const myUserInfo = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    return myUserInfo;
  } catch (error) {
    return null;
  }
};
