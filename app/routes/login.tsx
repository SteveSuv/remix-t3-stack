import { useNavigate, useRevalidator } from "@remix-run/react";
import { z } from "zod";
import { trpc } from "~/common/trpc";
import toast from "react-hot-toast";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { MetaFunction } from "@remix-run/node";
import { Controller, useZodForm } from "~/hooks/useZodForm";
import { clsx } from "~/common/clsx";

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
        <div>welcome {myUserInfo?.username}, you have already login</div>
        <button
          className="btn"
          onClick={() => {
            nav(-1);
          }}
        >
          Go Back
        </button>
      </>
    );
  }

  return (
    <>
      <div>Login Account</div>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={form.handleSubmit(async (data) => {
          const { userId } = await trpc().action.login.mutate(data);

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
          Login
        </button>
      </form>
    </>
  );
};

export default PageLogin;
