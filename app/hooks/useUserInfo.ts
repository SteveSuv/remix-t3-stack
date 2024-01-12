import { useLoaderData, useOutletContext } from "@remix-run/react";
import { loader } from "~/root";
import { IUserInfo } from "~/.server/auth";

export const useUserInfo = () => {
  const ctx = useOutletContext<{ userInfo: IUserInfo } | null>();
  const rootLoaderData = useLoaderData<typeof loader>() || {};

  // page use ctx, component use rootLoaderData
  const userInfo = ctx ? ctx.userInfo : rootLoaderData.userInfo;
  const userId = userInfo?.id;
  const isLogin = !!userInfo;

  return { userInfo, userId, isLogin };
};
