import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useParams,
  useRevalidator,
} from "@remix-run/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { clsx } from "~/utils/clsx";
import { trpc } from "~/utils/trpc";

type IParams = { username: string };

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const { username } = params as IParams;
  const { myTaskList, isSelf, userInfo } = data || {};
  if (!userInfo) {
    return [{ title: "page need login | remix-t3-stack" }];
  }
  if (!isSelf) {
    return [{ title: "no view permission | remix-t3-stack" }];
  }

  const unDoneTasksLength = myTaskList?.filter((e) => !e.done).length || 0;
  return [
    {
      title: `(${unDoneTasksLength}) ${username}'s Tasks | remix-t3-stack`,
    },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { username } = args.params as IParams;
  const { userInfo } = await trpc(args.request).loader.getUserInfo.query();

  const isSelf = !!userInfo && username === userInfo.username;

  if (isSelf) {
    const { myTaskList } = await trpc(
      args.request,
    ).loader.getMyTaskList.query();
    return { myTaskList, isSelf, userInfo };
  }

  return { myTaskList: [], isSelf, userInfo };
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
  const { revalidate } = useRevalidator();
  const { myTaskList, isSelf, userInfo } = useLoaderData<typeof loader>();
  const { username } = useParams() as IParams;

  if (!userInfo) {
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
        <div>you can't view tasks of other users ({username})</div>
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
              <div key={taskId}>
                {index > 0 && <div className="my-3 border-t" />}
                <div
                  className={clsx(
                    "flex flex-col",
                    done && "line-through opacity-60",
                  )}
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
                          toast.success("Task UnDone");
                        } else {
                          await trpc().action.doneTask.mutate({ taskId });
                          revalidate();
                          toast.success("Task Done");
                        }
                      }}
                    />
                    <div className="text-lg">{content}</div>
                  </div>
                  <div className="text-sm font-light text-gray-400">
                    create at {new Date(createAt).toLocaleString()}
                  </div>
                  <div className="text-sm font-light text-gray-400">
                    update at {new Date(updatedAt).toLocaleString()}
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
