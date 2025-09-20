import { User } from "lucide-react";
import { href, Link } from "react-router";
import { LuIcon } from "./LuIcon";

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
