import { Link } from "react-router";
import { trpcServer } from "~/common/trpc";
import { RegisterButton } from "~/components/RegisterButton";
import { Title } from "~/components/Title";
import { Route } from "./+types/_index";


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
        <title>Remix t3 Stack</title>
        <Title>No One User Yet</Title>
        <RegisterButton />
      </>
    );
  }

  return (
    <>
      <Title>User List ({userList.length})</Title>
      <div className="my-2 flex flex-col gap-2">
        {userList.map(({ id, username, createAt }, index) => {
          return (
            <div key={id}>
              <Link to={`/tasks/${username}`}>
                <div className="flex flex-col rounded-lg border border-base-300 px-4 py-2 transition-all hover:bg-base-200">
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
