import { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { LuIcon } from "~/components/LuIcon";
import { Title } from "~/components/Title";
import { ChevronLeft } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "page not found | remix-t3-stack" }];
};

const PageNotFound = () => {
  const nav = useNavigate();

  return (
    <>
      <Title>Page Not Found</Title>
      <button
        className="btn"
        onClick={() => {
          nav(-1);
        }}
      >
        <LuIcon icon={ChevronLeft} />
        Go Back
      </button>
    </>
  );
};

export default PageNotFound;
