import { unstable_defineLoader as defineLoader } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useParams,
  useRevalidator,
  MetaArgs_SingleFetch,
} from "@remix-run/react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Controller, useZodForm } from "~/hooks/useZodForm";
import { clsx } from "~/common/clsx";
import { trpcClient, trpcServer } from "~/common/trpc";
import { Trash2Icon, Plus, LogIn } from "lucide-react";
import { Title } from "~/components/Title";
import { LuIcon } from "~/components/LuIcon";

type IParams = { username: string };

export const meta = ({ params, data }: MetaArgs_SingleFetch<typeof loader>) => {
  const { username } = params as IParams;
  const { myTaskList, isSelf, myUserInfo } = data || {};
  if (!myUserInfo) {
    return [{ title: "page need login | remix-t3-stack" }];
  }
  if (!isSelf) {
    return [{ title: "no view permission | remix-t3-stack" }];
  }

  const unDoneTasksLength = myTaskList?.filter((e) => !e.done).length || 0;
  return [
    {
      title: `${unDoneTasksLength ? `(${unDoneTasksLength}) ` : ""}${username}'s Tasks | remix-t3-stack`,
    },
  ];
};

export const loader = defineLoader(async (args) => {
  const { username } = args.params as IParams;
  const { myUserInfo } = await trpcServer(
    args.request,
  ).loader.getMyUserInfo.query();

  const isSelf = !!myUserInfo && username === myUserInfo.username;

  if (isSelf) {
    const { myTaskList } = await trpcServer(
      args.request,
    ).loader.getMyTaskList.query();
    return { myTaskList, isSelf, myUserInfo };
  }

  return { myTaskList: [], isSelf, myUserInfo };
});

const AddTaskForm = () => {
  const { revalidate } = useRevalidator();

  const { form } = useZodForm({
    content: z.string().min(1).max(100),
  });

  return (
    <form
      className="flex flex-col gap-2"
      autoComplete="off"
      onSubmit={form.handleSubmit(async (data) => {
        await trpcClient.action.addTask.mutate(data);
        form.reset();
        toast.success("add task successful");
        revalidate();
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
        disabled={form.formState.isSubmitting}
      >
        <LuIcon icon={Plus} />
        Add Task
      </button>
    </form>
  );
};

const PageMyTasks = () => {
  const { revalidate } = useRevalidator();
  const { myTaskList, isSelf, myUserInfo } = useLoaderData<typeof loader>();
  const { username } = useParams() as IParams;

  if (!myUserInfo) {
    return (
      <>
        <Title>Page Need Login</Title>
        <Link to="/login">
          <button className="btn">
            <LuIcon icon={LogIn} />
            Login
          </button>
        </Link>
      </>
    );
  }

  if (!isSelf) {
    return (
      <>
        <Title>
          No Permission To Access Todolist Of Other User ({username})
        </Title>
        <Link to={`/tasks/${myUserInfo?.username}`}>
          <button className="btn">View My Tasks</button>
        </Link>
      </>
    );
  }

  if (!myTaskList.length) {
    return (
      <>
        <Title>No One Task Yet</Title>
        <AddTaskForm />
      </>
    );
  }

  const doneTaskList = myTaskList.filter((e) => !!e.done);
  const unDoneTaskList = myTaskList.filter((e) => !e.done);
  const sortedTaskList = [...unDoneTaskList, ...doneTaskList];

  return (
    <>
      <Title>
        Done ({doneTaskList.length}) / Tasks ({myTaskList.length})
      </Title>
      <div className="my-2 flex flex-col gap-4">
        {sortedTaskList.map((task) => {
          const { id: taskId, content, done, createAt, updatedAt } = task;

          return (
            <label key={taskId}>
              <div
                className={clsx(
                  "flex cursor-pointer justify-between gap-4 rounded-lg border px-4 py-2 hover:bg-gray-100",
                  done && "bg-gray-100 line-through opacity-60",
                )}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox"
                    defaultChecked={done}
                    onClick={async () => {
                      if (done) {
                        await trpcClient.action.unDoneTask.mutate({ taskId });
                        revalidate();
                        toast.success("Task UnDone");
                      } else {
                        await trpcClient.action.doneTask.mutate({ taskId });
                        revalidate();
                        toast.success("Task Done");
                      }
                    }}
                  />
                  <div className="text-lg">{content}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <div className="text-sm font-light text-gray-400">
                      create at {new Date(createAt).toLocaleString()}
                    </div>
                    <div className="text-sm font-light text-gray-400">
                      update at {new Date(updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <button
                    className="btn btn-circle btn-ghost btn-sm"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await trpcClient.action.deleteTask.mutate({ taskId });
                      revalidate();
                      toast.success("Task Deleted");
                    }}
                  >
                    <Trash2Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-gray-500"
                    />
                  </button>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      <AddTaskForm />
    </>
  );
};

export default PageMyTasks;
