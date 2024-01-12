import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { trpc } from "~/utils/trpc";

export const meta: MetaFunction = () => {
  return [{ title: "remix-t3-stack" }];
};

// server loader just for ssr
export const loader = async (args: LoaderFunctionArgs) => {
  const { userList } = await trpc(args.request).loader.getUserList.query();
  return { userList };
};

const RegisterButton = () => (
  <Link to="/register">
    <button className="btn">Register New Account</button>
  </Link>
);

const PageHome = () => {
  const { userList } = useLoaderData<typeof loader>();

  if (!userList.length) {
    return (
      <>
        <div>no user yet</div>
        <RegisterButton />
      </>
    );
  }

  return (
    <>
      <div>UserList ({userList.length})</div>
      <div className="my-2 flex flex-col">
        {userList.map(({ id, username, createAt }, index) => {
          return (
            <div key={id}>
              {index > 0 && <div className="my-1 border-t" />}
              <Link to={`/tasks/${username}`}>
                <div className="flex flex-col rounded-lg px-2 py-3 transition-all hover:bg-gray-100">
                  <div className="text-lg">username: {username}</div>
                  <div className="text-sm font-light text-gray-400">
                    create at {new Date(createAt).toLocaleString()}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <RegisterButton />
    </>
  );
};

export default PageHome;
