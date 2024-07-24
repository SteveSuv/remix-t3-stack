import { Link, useRevalidator } from "@remix-run/react";
import { trpcClient } from "~/common/trpc";
import toast from "react-hot-toast";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";
import { Home, LogIn, LogOut, User } from "lucide-react";
import { LuIcon } from "./LuIcon";
import { BackButton } from "./BackButton";

export const Header = () => {
  const { myUserInfo } = useMyUserInfo();
  const { revalidate } = useRevalidator();

  return (
    <div className="fixed left-0 top-0 flex w-screen items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <Link to="/">
          <button className="btn btn-sm">
            <LuIcon icon={Home} /> Home
          </button>
        </Link>
        <BackButton className="btn-sm" />
      </div>
      {myUserInfo ? (
        <div className="flex items-center gap-2">
          <Link to={`/tasks/${myUserInfo.username}`}>
            <button className="btn btn-sm">
              <LuIcon icon={User} />
              {myUserInfo.username}
            </button>
          </Link>
          <button
            className="btn btn-sm"
            onClick={async () => {
              // client fetch mutation
              await trpcClient.action.logout.mutate();
              toast.success("logout successful");
              // reload all loader data
              revalidate();
            }}
          >
            <LuIcon icon={LogOut} />
            Logout
          </button>
        </div>
      ) : (
        <Link className="btn btn-sm" to="/login">
          <LuIcon icon={LogIn} />
          Login
        </Link>
      )}
    </div>
  );
};
