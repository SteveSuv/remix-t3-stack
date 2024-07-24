import { useLoaderData, useOutletContext } from "@remix-run/react";
import { loader } from "~/root";
import { IMyUserInfo } from "~/.server/auth";

export const useMyUserInfo = () => {
  const ctx = useOutletContext<{ myUserInfo: IMyUserInfo } | null>();
  const rootLoaderData = useLoaderData<typeof loader>() || {};

  // page use ctx, component use rootLoaderData
  const myUserInfo = ctx ? ctx.myUserInfo : rootLoaderData.myUserInfo;

  return { myUserInfo };
};
