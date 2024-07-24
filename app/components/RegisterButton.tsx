import { Link } from "@remix-run/react";
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
