import { JWT_KEY } from "~/utils/constant";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { Cookies } from "./cookies";

export type IUserInfo = {
  id: string;
  username: string;
} | null;

export const getUserInfo = async (request: Request) => {
  const token = Cookies.get(request, JWT_KEY);

  if (!token) return null;

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
