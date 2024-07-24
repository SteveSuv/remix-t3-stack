import { useNavigate, useRevalidator } from "@remix-run/react";
import { z } from "zod";
import { trpcClient } from "~/common/trpc";
import toast from "react-hot-toast";
import { MetaFunction } from "@remix-run/node";
import { Controller, useZodForm } from "~/hooks/useZodForm";
import { clsx } from "~/common/clsx";
import { Title } from "~/components/Title";
import { LuIcon } from "~/components/LuIcon";
import { User } from "lucide-react";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { BackButton } from "~/components/BackButton";

export const meta: MetaFunction = () => {
  return [{ title: "register account | remix-t3-stack" }];
};

const PageRegister = () => {
  const { revalidate } = useRevalidator();
  const nav = useNavigate();
  const { myUserInfo } = useMyUserInfo();

  const { form } = useZodForm({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(20),
  });

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
          const { userId } = await trpcClient.action.register.mutate(data);
          if (userId) {
            form.reset();
            toast.success("register successful");
            revalidate();
            nav("/login", { replace: true });
          }
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
          disabled={form.formState.isSubmitting}
        >
          <LuIcon icon={User} />
          Register
        </button>
      </form>
    </>
  );
};

export default PageRegister;
