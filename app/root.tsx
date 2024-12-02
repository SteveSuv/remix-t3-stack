import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { trpcServer } from "./common/trpc";
import { ReactNode } from "react";
import { Header } from "./components/Header";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/Toaster";
import { Route } from "./+types/root";
import stylesheet from "./global.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App({
  loaderData: { myUserInfo },
}: Route.ComponentProps) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <Header />
          <Outlet context={{ myUserInfo }} />
        </main>
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
