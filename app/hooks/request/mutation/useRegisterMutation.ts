import { registerFormSchema } from "~/common/formSchema";
import { useNavigate, useRevalidator } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useRegisterMutation = () => {
  const { revalidate } = useRevalidator();
  const nav = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: z.infer<typeof registerFormSchema>) => {
      return trpcClient.action.register.mutate(data);
    },
    onSuccess() {
      toast.success("register successful");
      revalidate();
      nav("/login", { replace: true });
    },
    onError: OnTRPCError,
  });
};
