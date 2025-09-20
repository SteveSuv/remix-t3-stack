import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import {
  Links,
  LinksFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { queryClient } from "~/common/queryClient";
import { trpcServer } from "~/common/trpc";
import { GlobalComponents } from "~/components/GlobalComponents";
import { Header } from "~/components/Header";
import globalStyle from "~/global.css?url";
import { Route } from "./+types/root";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStyle,
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { myUserInfo } = await trpcServer(request).loader.getMyUserInfo.query();
  return { myUserInfo };
};

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="remix-t3-stack" />
        <meta name="keywords" content="remix,react,todolist" />
        <meta name="author" content="https://github.com/SteveSuv" />
        <meta
          name="repository"
          content="https://github.com/SteveSuv/remix-t3-stack"
        />
        <Meta />
        <Links />
        <title>remix-t3-stack</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App({
  loaderData: { myUserInfo },
}: Route.ComponentProps) {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <Header />
          <Outlet context={{ myUserInfo }} />
        </main>
        <GlobalComponents />
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
