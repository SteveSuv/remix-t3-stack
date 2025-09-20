import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export const GlobalComponents = () => {
  return (
    <>
      <Toaster />
      <ReactQueryDevtools />
    </>
  );
};
