import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "@remix-run/react";
import { trpc } from "./utils/trpc";
import "./global.css";
import toast, { Toaster } from "react-hot-toast";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userInfo } = await trpc(args.request).loader.getUserInfo.query();
  return { userInfo };
};

const App = () => {
  const { userInfo } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();
  const nav = useNavigate();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <div className="fixed left-0 top-0 flex w-screen items-center justify-between p-6">
            <div className="flex items-center gap-2">
              <Link to="/">
                <button className="btn btn-sm">Home</button>
              </Link>
              <button
                className="btn btn-sm"
                onClick={() => {
                  nav(-1);
                }}
              >
                Back
              </button>
            </div>
            {userInfo ? (
              <div className="flex items-center gap-2">
                <Link to={`/tasks/${userInfo.username}`}>
                  <div className="font-bold">{userInfo.username}</div>
                </Link>
                <button
                  className="btn btn-sm"
                  onClick={async () => {
                    // client fetch mutation
                    await trpc().action.logout.mutate();
                    toast.success("logout successful");
                    // reload all loader data
                    revalidate();
                  }}
                >
                  logout
                </button>
              </div>
            ) : (
              <Link className="btn btn-sm" to="/login">
                Login
              </Link>
            )}
          </div>
          <Outlet context={{ userInfo }} />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster />
      </body>
    </html>
  );
};

export default App;
