import { QueryClient } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5min
    },
    mutations: {
      onError(error) {
        toast.error((error as TRPCError).message);
      },
    },
  },
});
