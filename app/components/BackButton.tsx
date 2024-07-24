import { ChevronLeft } from "lucide-react";
import { LuIcon } from "./LuIcon";
import { useNavigate } from "@remix-run/react";
import { clsx } from "~/common/clsx";
import { ComponentProps } from "react";

export const BackButton = (props: ComponentProps<"button">) => {
  const nav = useNavigate();

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
