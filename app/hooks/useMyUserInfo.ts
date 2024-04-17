import { useLoaderData, useOutletContext } from "@remix-run/react";
import { loader } from "~/root";
import { IUserInfo } from "~/.server/auth";

export const useMyUserInfo = () => {
  const ctx = useOutletContext<{ myUserInfo: IUserInfo } | null>();
  const rootLoaderData = useLoaderData<typeof loader>() || {};

  // page use ctx, component use rootLoaderData
  const myUserInfo = ctx ? ctx.myUserInfo : rootLoaderData.myUserInfo;

  return { myUserInfo };
};
