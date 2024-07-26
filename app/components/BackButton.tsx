import { ChevronLeft } from "lucide-react";
import { LuIcon } from "./LuIcon";
import { useLocation, useNavigate } from "@remix-run/react";
import { clsx } from "~/common/clsx";
import { ComponentProps } from "react";

export const BackButton = (props: ComponentProps<"button">) => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  if (isHomePage) return null;

  return (
    <button
      className={clsx("btn", props.className)}
      onClick={() => {
        nav(-1);
      }}
    >
      <LuIcon icon={ChevronLeft} />
      Back
    </button>
  );
};
