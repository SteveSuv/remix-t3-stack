import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { trpc } from "./utils/trpc";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { Header } from "./components/Header";
import "./global.css";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userInfo } = await trpc(args.request).loader.getUserInfo.query();
  return { userInfo };
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  const { userInfo } = useLoaderData<typeof loader>();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Header />
      <Outlet context={{ userInfo }} />
      <Toaster />
    </main>
  );
};

export default App;
