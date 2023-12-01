import jwt from "jsonwebtoken";
import { db } from "./db.server";
import { Cookies } from "./cookies.server";
import { JWT_KEY } from "~/utils/constant";

export type IUserInfo = {
  id: string;
  uid: string;
  username: string;
  email: string;
  avatar: string | null;
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
