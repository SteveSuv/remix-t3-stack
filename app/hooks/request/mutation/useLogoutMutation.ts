import { useRevalidator } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useLogoutMutation = () => {
  const { revalidate } = useRevalidator();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      return trpcClient.action.logout.mutate();
    },
    onSuccess() {
      toast.success("logout successful");
      revalidate();
    },
    onError: OnTRPCError,
  });
};
