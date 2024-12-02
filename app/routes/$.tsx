import { Title } from "~/components/Title";
import { BackButton } from "~/components/BackButton";
import { Route } from "./+types/$";

export const meta: Route.MetaFunction = () => {
  return [{ title: "page not found | remix-t3-stack" }];
};

export default function PageNotFound() {
  return (
    <>
      <Title>Page Not Found</Title>
      <BackButton />
    </>
  );
}
