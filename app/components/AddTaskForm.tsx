import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useRevalidator } from "react-router";
import { clsx } from "~/common/clsx";
import { addTaskFormSchema } from "~/common/formSchema";
import { trpcClient } from "~/common/trpc";
import { useZodForm } from "~/hooks/useZodForm";
import { LuIcon } from "./LuIcon";

export const AddTaskForm = () => {
  const { revalidate } = useRevalidator();
  const { form } = useZodForm(addTaskFormSchema);
  const addTaskMutation = useMutation(
    trpcClient.action.addTask.mutationOptions({
      onSuccess() {
        toast.success("add task successful");
        revalidate();
      },
    }),
  );

  return (
    <form
      className="flex flex-col gap-2"
      autoComplete="off"
      onSubmit={form.handleSubmit(async (data) => {
        await addTaskMutation.mutateAsync(data);
        form.reset();
      })}
    >
      <Controller
        name="content"
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
              placeholder="input task content"
              required
              min={1}
              max={100}
            />
            <small className="text-error">{fieldState.error?.message}</small>
          </>
        )}
      />

      <button
        className="btn"
        type="submit"
        disabled={form.formState.isSubmitting || addTaskMutation.isPending}
      >
        <LuIcon icon={Plus} />
        Add Task
      </button>
    </form>
  );
};
