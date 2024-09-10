import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import { clsx } from "~/common/clsx";
import { addTaskFormSchema } from "~/common/formSchema";
import { useAddTaskMutation } from "~/hooks/request/mutation/useAddTaskMutation";
import { useZodForm } from "~/hooks/useZodForm";
import { LuIcon } from "./LuIcon";

export const AddTaskForm = () => {
  const { form } = useZodForm(addTaskFormSchema);
  const addTaskMutation = useAddTaskMutation();

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
