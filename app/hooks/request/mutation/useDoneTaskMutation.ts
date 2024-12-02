import { useRevalidator } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useDoneTaskMutation = () => {
  const { revalidate } = useRevalidator();

  return useMutation({
    mutationKey: ["doneTask"],
    mutationFn: (data: { taskId: string }) => {
      return trpcClient.action.doneTask.mutate(data);
    },
    onSuccess() {
      toast.success("task done");
      revalidate();
    },
    onError: OnTRPCError,
  });
};
