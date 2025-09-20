import { Moon, Sun } from "lucide-react";
import { ComponentProps } from "react";
import { clsx } from "~/common/clsx";
import { useAppTheme } from "~/hooks/useAppTheme";
import { LuIcon } from "./LuIcon";

export const ThemeButton = (props: ComponentProps<"button">) => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <button
      {...props}
      className={clsx("btn", props.className)}
      onClick={toggleTheme}
    >
      <LuIcon icon={isDarkMode ? Sun : Moon} />
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
};
