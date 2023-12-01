import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "page not found | remix-t3-stack" }];
};

const PageNotFound = () => {
  const nav = useNavigate();
  return (
    <>
      <div>Page Not Found</div>
      <button
        className="btn"
        onClick={() => {
          nav(-1);
        }}
      >
        go back
      </button>
    </>
  );
};

export default PageNotFound;
