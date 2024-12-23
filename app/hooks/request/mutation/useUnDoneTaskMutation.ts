import { useRevalidator } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useUnDoneTaskMutation = () => {
  const { revalidate } = useRevalidator();

  return useMutation({
    mutationKey: ["unDoneTask"],
    mutationFn: (data: { taskId: string }) => {
      return trpcClient.action.unDoneTask.mutate(data);
    },
    onSuccess() {
      toast.success("task unDone");
      revalidate();
    },
    onError: OnTRPCError,
  });
};
