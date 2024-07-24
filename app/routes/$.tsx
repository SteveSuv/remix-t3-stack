import { MetaFunction } from "@remix-run/node";
import { Title } from "~/components/Title";
import { BackButton } from "~/components/BackButton";

export const meta: MetaFunction = () => {
  return [{ title: "page not found | remix-t3-stack" }];
};

const PageNotFound = () => {
  return (
    <>
      <Title>Page Not Found</Title>
      <BackButton />
    </>
  );
};

export default PageNotFound;
