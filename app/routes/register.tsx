import { useNavigate, useRevalidator } from "@remix-run/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/utils/trpc";
import toast from "react-hot-toast";

const PageRegister = () => {
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

  return (
    <>
      <div>Register Account</div>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit(
          async (data) => {
            const { userId } = await trpc().action.register.mutate(data);
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
          Register
        </button>
      </form>
    </>
  );
};

export default PageRegister;
