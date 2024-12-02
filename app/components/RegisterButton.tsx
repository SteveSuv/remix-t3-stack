import { Link } from "react-router";
import { LuIcon } from "./LuIcon";
import { User } from "lucide-react";

export const RegisterButton = () => {
  return (
    <Link to="/register">
      <button className="btn">
        <LuIcon icon={User} />
        Register New Account
      </button>
    </Link>
  );
};
