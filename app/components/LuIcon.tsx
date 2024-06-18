import { LucideIcon, LucideProps } from "lucide-react";

export const LuIcon = (props: LucideProps & { icon: LucideIcon }) => {
  const LuIcon = props.icon;

  return <LuIcon {...props} size={props.size || 18} strokeWidth={1.5} />;
};
