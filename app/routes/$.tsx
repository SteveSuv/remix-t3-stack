import { useNavigate } from "@remix-run/react";

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
