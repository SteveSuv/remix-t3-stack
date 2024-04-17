import { Link, useNavigate, useRevalidator } from "@remix-run/react";
import { trpc } from "~/common/trpc";
import toast from "react-hot-toast";
import { useMyUserInfo } from "~/hooks/useMyUserInfo";

export const Header = () => {
  const { myUserInfo } = useMyUserInfo();
  const { revalidate } = useRevalidator();
  const nav = useNavigate();

  return (
    <div className="fixed left-0 top-0 flex w-screen items-center justify-between p-6">
      <div className="flex items-center gap-2">
        <Link to="/">
          <button className="btn btn-sm">Home</button>
        </Link>
        <button
          className="btn btn-sm"
          onClick={() => {
            nav(-1);
          }}
        >
          Back
        </button>
      </div>
      {myUserInfo ? (
        <div className="flex items-center gap-2">
          <Link to={`/tasks/${myUserInfo.username}`}>
            <div className="font-bold">{myUserInfo.username}</div>
          </Link>
          <button
            className="btn btn-sm"
            onClick={async () => {
              // client fetch mutation
              await trpc().action.logout.mutate();
              toast.success("logout successful");
              // reload all loader data
              revalidate();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link className="btn btn-sm" to="/login">
          Login
        </Link>
      )}
    </div>
  );
};
