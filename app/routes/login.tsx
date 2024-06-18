import { useNavigate, useRevalidator } from "@remix-run/react";
import { z } from "zod";
import { trpc } from "~/common/trpc";
import toast from "react-hot-toast";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { MetaFunction } from "@remix-run/node";
import { Controller, useZodForm } from "~/hooks/useZodForm";
import { clsx } from "~/common/clsx";
import { TRPCClientError } from "@trpc/client";
import { Title } from "~/components/Title";
import { LuIcon } from "~/components/LuIcon";
import { LogIn, ChevronLeft } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "login account | remix-t3-stack" }];
};

const PageLogin = () => {
  const { myUserInfo } = useMyUserInfo();
  const { revalidate } = useRevalidator();
  const nav = useNavigate();

  const { form } = useZodForm({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(20),
  });

  if (myUserInfo) {
    return (
      <>
        <Title>Welcome {myUserInfo?.username}, You Have Already Login</Title>
        <button
          className="btn"
          onClick={() => {
            nav(-1);
          }}
        >
          <LuIcon icon={ChevronLeft} />
          Go Back
        </button>
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
          try {
            const { userId } = await trpc().action.login.mutate(data);

            if (userId) {
              form.reset();
              toast.success("register successful");
              revalidate();
              nav("/", { replace: true });
            }
          } catch (error) {
            toast.error((error as TRPCClientError<any>).message);
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
          <LuIcon icon={LogIn} />
          Login
        </button>
      </form>
    </>
  );
};

export default PageLogin;
