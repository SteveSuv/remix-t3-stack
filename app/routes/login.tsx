import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { Controller, useZodForm } from "~/hooks/useZodForm";
import { clsx } from "~/common/clsx";
import { Title } from "~/components/Title";
import { LuIcon } from "~/components/LuIcon";
import { LogIn } from "lucide-react";
import { BackButton } from "~/components/BackButton";
import { loginFormSchema } from "~/common/formSchema";
import { useloginMutation } from "~/hooks/request/mutation/useLoginMutation";
import { Route } from "./+types/login";

export const meta: Route.MetaFunction = () => {
  return [{ title: "login account | remix-t3-stack" }];
};

export default function PageLogin() {
  const { myUserInfo } = useMyUserInfo();
  const loginMutation = useloginMutation();
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
