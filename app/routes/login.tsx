import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useRevalidator } from "react-router";
import { clsx } from "~/common/clsx";
import { loginFormSchema } from "~/common/formSchema";
import { trpcClient } from "~/common/trpc";
import { BackButton } from "~/components/BackButton";
import { LuIcon } from "~/components/LuIcon";
import { Title } from "~/components/Title";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { useZodForm } from "~/hooks/useZodForm";
import { Route } from "./+types/login";

export const meta: Route.MetaFunction = () => {
  return [{ title: "login account | remix-t3-stack" }];
};

export default function PageLogin() {
  const { revalidate } = useRevalidator();
  const { myUserInfo } = useMyUserInfo();
  const loginMutation = useMutation(
    trpcClient.action.login.mutationOptions({
      onSuccess() {
        toast.success("login successful");
        revalidate();
      },
    }),
  );
  const { form } = useZodForm(loginFormSchema);

  if (myUserInfo) {
    return (
      <>
        <Title>Welcome {myUserInfo?.username}, You Have Already Login</Title>
        <BackButton />
      </>
    );
  }

  return (
    <>
      <Title>Login Account</Title>
      <form
        className="flex flex-col gap-2"
        autoComplete="off"
        onSubmit={form.handleSubmit(async (data) => {
          await loginMutation.mutateAsync(data);
          form.reset();
        })}
      >
        <Controller
          name="username"
          defaultValue=""
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                className={clsx(
                  "input input-bordered w-[300px]",
                  fieldState.invalid && "input-error",
                )}
                placeholder="username"
                required
                autoFocus
                min={3}
                max={20}
              />
              <small className="text-error">{fieldState.error?.message}</small>
            </>
          )}
        />

        <Controller
          name="password"
          defaultValue=""
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                className={clsx(
                  "input input-bordered w-[300px]",
                  fieldState.invalid && "input-error",
                )}
                type="password"
                placeholder="password"
                required
                min={3}
                max={20}
              />
              <small className="text-error">{fieldState.error?.message}</small>
            </>
          )}
        />

        <button
          className="btn"
          type="submit"
          disabled={form.formState.isSubmitting || loginMutation.isPending}
        >
          <LuIcon icon={LogIn} />
          Login
        </button>
      </form>
    </>
  );
}
