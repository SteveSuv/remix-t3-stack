import { Link } from "react-router";
import { clsx } from "~/common/clsx";
import { trpcServer } from "~/common/trpc";
import { Trash2Icon, LogIn } from "lucide-react";
import { Title } from "~/components/Title";
import { LuIcon } from "~/components/LuIcon";
import { useUnDoneTaskMutation } from "~/hooks/request/mutation/useUnDoneTaskMutation";
import { useDoneTaskMutation } from "~/hooks/request/mutation/useDoneTaskMutation";
import { useDeleteTaskMutation } from "~/hooks/request/mutation/useDeleteTaskMutation";
import { AddTaskForm } from "~/components/AddTaskForm";
import { Route } from "./+types/tasks.$username";



export const loader = async ({
  params: { username },
  request,
}: Route.LoaderArgs) => {
  const { myUserInfo } = await trpcServer(request).loader.getMyUserInfo.query();

  const isSelf = !!myUserInfo && username === myUserInfo.username;

  if (isSelf) {
    const { myTaskList } =
      await trpcServer(request).loader.getMyTaskList.query();
    return { myTaskList, isSelf, myUserInfo };
  }

  return { myTaskList: [], isSelf, myUserInfo };
};

export default function PageMyTasks({
  params: { username },
  loaderData: { myTaskList, isSelf, myUserInfo },
}: Route.ComponentProps) {
  const unDoneTaskMutation = useUnDoneTaskMutation();
  const doneTaskMutation = useDoneTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  if (!myUserInfo) {
    return (
      <>
        <title>Login Required</title>

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
        <title>No View Permission</title>

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
                  "flex cursor-pointer justify-between gap-4 rounded-lg border border-base-300 px-4 py-2 hover:bg-base-200",
                  done && "bg-base-200 line-through opacity-60",
                )}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox-success checkbox"
                    defaultChecked={done}
                    disabled={
                      unDoneTaskMutation.isPending || doneTaskMutation.isPending
                    }
                    onClick={async () => {
                      if (done) {
                        await unDoneTaskMutation.mutateAsync({ taskId });
                      } else {
                        await doneTaskMutation.mutateAsync({ taskId });
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
                    disabled={deleteTaskMutation.isPending}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await deleteTaskMutation.mutateAsync({ taskId });
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
}
