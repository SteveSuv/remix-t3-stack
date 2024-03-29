import { useNavigate, useRevalidator } from "@remix-run/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/utils/trpc";
import toast from "react-hot-toast";
import { useUserInfo } from "~/hooks/useUserInfo";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "login account | remix-t3-stack" }];
};

const PageLogin = () => {
  const { isLogin, userInfo } = useUserInfo();
  const { revalidate } = useRevalidator();
  const nav = useNavigate();

  const FormSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(20),
  });

  type FormType = z.infer<typeof FormSchema>;

  const { register, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  if (isLogin) {
    return (
      <>
        <div>welcome {userInfo?.username}, you have already login</div>
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
        onSubmit={handleSubmit(
          async (data) => {
            const { userId } = await trpc().action.login.mutate(data);
            revalidate();
            if (userId) {
              reset();
              toast.success("register successful");
              nav("/login", { replace: true });
            }
          },
          (errors) => {
            console.error(errors);
            toast.error("invalid username or password");
          },
        )}
      >
        <input
          {...register("username")}
          className="input input-bordered w-[300px]"
          placeholder="username"
          required
          autoFocus
          min={3}
          max={20}
        />
        <input
          {...register("password")}
          className="input input-bordered w-[300px]"
          type="password"
          placeholder="password"
          required
          min={3}
          max={20}
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default PageLogin;
