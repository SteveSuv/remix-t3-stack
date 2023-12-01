import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useRevalidator } from "@remix-run/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useUserInfo } from "~/hooks/useUserInfo";
import { trpc } from "~/utils/trpc";
import clsx from "clsx";

export const loader = async (args: LoaderFunctionArgs) => {
  const { username } = args.params as { username: string };
  const { myTaskList } = await trpc(args.request).loader.getMyTaskList.query();
  return { myTaskList, username };
};

const AddTaskForm = () => {
  const { revalidate } = useRevalidator();

  const FormSchema = z.object({
    content: z.string().min(1).max(100),
  });

  type FormType = z.infer<typeof FormSchema>;

  const { register, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <form
      className="flex flex-col gap-4"
      autoComplete="off"
      onSubmit={handleSubmit(
        async (data) => {
          await trpc().action.addTask.mutate(data);
          revalidate();
          reset();
          toast.success("add task successful");
        },
        (errors) => {
          console.error(errors);
          toast.error("invalid content");
        },
      )}
    >
      <input
        {...register("content")}
        className="input input-bordered w-[300px]"
        placeholder="input task content"
        required
        min={1}
        max={100}
      />
      <button className="btn" type="submit">
        Add Task
      </button>
    </form>
  );
};

const PageMyTasks = () => {
  const { userInfo, isLogin } = useUserInfo();
  const { revalidate } = useRevalidator();
  const { myTaskList, username } = useLoaderData<typeof loader>();
  const isSelf = username === userInfo?.username;

  if (!isLogin) {
    return (
      <>
        <div>this page need login</div>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </>
    );
  }

  if (!isSelf) {
    return (
      <>
        <div>you can't view tasks of other users</div>
        <Link to={`/tasks/${userInfo?.username}`}>
          <button className="btn">View my tasks</button>
        </Link>
      </>
    );
  }

  if (!myTaskList.length) {
    return (
      <>
        <div>no task yet</div>
        <AddTaskForm />
      </>
    );
  }

  return (
    <>
      <div>
        Done ({myTaskList.filter((e) => !!e.done).length}) / Tasks (
        {myTaskList.length})
      </div>
      <div className="my-2 flex flex-col">
        {myTaskList.map(
          ({ id: taskId, content, done, createAt, updatedAt }, index) => {
            return (
              <div>
                {index > 0 && <div className="my-3 border-t" />}
                <div
                  className={clsx(
                    "flex flex-col",
                    done && "line-through opacity-60",
                  )}
                  key={taskId}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      defaultChecked={done}
                      onClick={async () => {
                        if (done) {
                          await trpc().action.unDoneTask.mutate({ taskId });
                          revalidate();
                          toast.success("Task Done");
                        } else {
                          await trpc().action.doneTask.mutate({ taskId });
                          revalidate();
                          toast.success("Task UnDone");
                        }
                      }}
                    />
                    <div className="text-lg">{content}</div>
                  </div>
                  <div className="text-sm font-light text-gray-400">
                    created at {createAt}
                  </div>
                  <div className="text-sm font-light text-gray-400">
                    updated at {updatedAt}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
      <AddTaskForm />
    </>
  );
};

export default PageMyTasks;
