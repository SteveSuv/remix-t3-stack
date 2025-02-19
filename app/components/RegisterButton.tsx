import { href, Link } from "react-router";
import { LuIcon } from "./LuIcon";
import { User } from "lucide-react";

export const RegisterButton = () => {
  return (
    <Link to={href("/register")}>
      <button className="btn">
        <LuIcon icon={User} />
        Register New Account
      </button>
    </Link>
  );
};
