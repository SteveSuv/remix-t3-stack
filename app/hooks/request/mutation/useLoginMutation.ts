import { loginFormSchema } from "~/common/formSchema";
import { useNavigate, useRevalidator } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";
import { trpcClient } from "~/common/trpc";
import { OnTRPCError } from "~/common/utils";

export const useloginMutation = () => {
  const { revalidate } = useRevalidator();
  const nav = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: z.infer<typeof loginFormSchema>) => {
      return trpcClient.action.login.mutate(data);
    },
    onSuccess() {
      toast.success("login successful");
      revalidate();
      nav("/", { replace: true });
    },
    onError: OnTRPCError,
  });
};
