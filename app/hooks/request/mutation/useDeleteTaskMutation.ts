import { useRevalidator } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useDeleteTaskMutation = () => {
  const { revalidate } = useRevalidator();

  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (data: { taskId: string }) => {
      return trpcClient.action.deleteTask.mutate(data);
    },
    onSuccess() {
      toast.success("Task Deleted");
      revalidate();
    },
    onError: OnTRPCError,
  });
};
