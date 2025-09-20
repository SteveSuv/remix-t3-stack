import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useRevalidator } from "react-router";
import { clsx } from "~/common/clsx";
import { registerFormSchema } from "~/common/formSchema";
import { trpcClient } from "~/common/trpc";
import { BackButton } from "~/components/BackButton";
import { LuIcon } from "~/components/LuIcon";
import { Title } from "~/components/Title";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { useZodForm } from "~/hooks/useZodForm";
import { Route } from "./+types/register";

export const meta: Route.MetaFunction = () => {
  return [{ title: "register account | remix-t3-stack" }];
};

export default function PageRegister() {
  const { revalidate } = useRevalidator();
  const { myUserInfo } = useMyUserInfo();
  const registerMutation = useMutation(
    trpcClient.action.register.mutationOptions({
      onSuccess() {
        toast.success("register successful");
        revalidate();
      },
    }),
  );

  const { form } = useZodForm(registerFormSchema);

  if (myUserInfo) {
    return (
      <>
        <Title>You Need To Logout Before You Register Account</Title>
        <BackButton />
      </>
    );
  }

  return (
    <>
      <Title>Register New Account</Title>
      <form
        className="flex flex-col gap-2"
        autoComplete="off"
        onSubmit={form.handleSubmit(async (data) => {
          await registerMutation.mutateAsync(data);
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

        <Controller
          name="password2"
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
          disabled={form.formState.isSubmitting || registerMutation.isPending}
        >
          <LuIcon icon={User} />
          Register
        </button>
      </form>
    </>
  );
}
