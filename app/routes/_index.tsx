import { Link } from "react-router";
import { trpcServer } from "~/common/trpc";
import { RegisterButton } from "~/components/RegisterButton";
import { Title } from "~/components/Title";
import { Route } from "./+types/_index";

export const meta: Route.MetaFunction = () => {
  return [{ title: "remix-t3-stack" }];
};

// server loader just for ssr
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { userList } = await trpcServer(request).loader.getUserList.query();
  return { userList };
};

export default function PageHome({
  loaderData: { userList },
}: Route.ComponentProps) {
  if (!userList.length) {
    return (
      <>
        <Title>No One User Yet</Title>
        <RegisterButton />
      </>
    );
  }

  return (
    <>
      <Title>User List ({userList.length})</Title>
      <div className="border-base-200 mb-4 grid h-[70vh] grid-cols-4 gap-4 overflow-scroll border p-4 shadow-md">
        {userList.map(({ id, username, createAt }) => {
          return (
            <div key={id}>
              <Link to={`/tasks/${username}`}>
                <div className="border-base-300 hover:bg-base-200 flex flex-col rounded-lg border px-4 py-2 transition-all">
                  <div className="text-lg">{username}</div>
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
}
