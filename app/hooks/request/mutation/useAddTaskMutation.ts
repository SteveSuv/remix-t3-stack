import { addTaskFormSchema } from "~/common/formSchema";
import { useRevalidator } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useAddTaskMutation = () => {
  const { revalidate } = useRevalidator();

  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: (data: z.infer<typeof addTaskFormSchema>) => {
      return trpcClient.action.addTask.mutate(data);
    },
    onSuccess() {
      toast.success("add task successful");
      revalidate();
    },
    onError: OnTRPCError,
  });
};
