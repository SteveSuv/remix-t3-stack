import { href, Link } from "react-router";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { Home, LogIn, LogOut, User } from "lucide-react";
import { LuIcon } from "./LuIcon";
import { BackButton } from "./BackButton";
import { ThemeButton } from "./ThemeButton";
import { useLogoutMutation } from "~/hooks/request/mutation/useLogoutMutation";

export const Header = () => {
  const { myUserInfo } = useMyUserInfo();
  const logoutMutation = useLogoutMutation();

  return (
    <div className="fixed top-0 left-0 flex w-screen items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <Link to={href("/")}>
          <button className="btn btn-sm">
            <LuIcon icon={Home} /> Home
          </button>
        </Link>
        <BackButton className="btn-sm" />
      </div>
      <div className="flex items-center gap-2">
        {myUserInfo ? (
          <div className="flex items-center gap-2">
            <Link
              to={href("/tasks/:username", { username: myUserInfo.username })}
            >
              <button className="btn btn-sm">
                <LuIcon icon={User} />
                {myUserInfo.username}
              </button>
            </Link>
            <button
              className="btn btn-sm"
              disabled={logoutMutation.isPending}
              onClick={() => {
                logoutMutation.mutateAsync();
              }}
            >
              <LuIcon icon={LogOut} />
              Logout
            </button>
          </div>
        ) : (
          <Link className="btn btn-sm" to={href("/login")}>
            <LuIcon icon={LogIn} />
            Login
          </Link>
        )}
        <ThemeButton className="btn-sm" />
      </div>
    </div>
  );
};
