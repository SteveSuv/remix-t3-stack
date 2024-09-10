import { Moon, Sun } from "lucide-react";
import { LuIcon } from "./LuIcon";
import { useAppTheme } from "~/hooks/useAppTheme";
import { ComponentProps } from "react";
import { clsx } from "~/common/clsx";

export const ThemeButton = (props: ComponentProps<"button">) => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <button
      {...props}
      className={clsx("btn", props.className)}
      onClick={toggleTheme}
    >
      <LuIcon icon={isDarkMode ? Sun : Moon} />
      {isDarkMode ? "Ligth" : "Dark"}
    </button>
  );
};
