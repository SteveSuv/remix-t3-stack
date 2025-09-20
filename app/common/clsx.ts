import { ClassNameValue, twJoin, twMerge } from "tailwind-merge";

export const clsx = (...inputs: ClassNameValue[]) => {
  return twMerge(twJoin(inputs));
};
