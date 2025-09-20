import { useLoaderData, useOutletContext } from "react-router";
import { IMyUserInfo } from "~/.server/common/auth";
import { loader } from "~/root";

export const useMyUserInfo = () => {
  const ctx = useOutletContext<{ myUserInfo: IMyUserInfo } | null>();
  const rootLoaderData = useLoaderData<typeof loader>() || {};

  // page use ctx, component use rootLoaderData
  const myUserInfo = ctx ? ctx.myUserInfo : rootLoaderData.myUserInfo;

  return { myUserInfo };
};
