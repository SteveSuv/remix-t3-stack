import { ComponentProps } from "react";
import { clsx } from "~/common/clsx";

export const Title = (props: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={clsx("mb-4 text-lg font-bold", props.className)}
    />
  );
};
