import PrivateLayout from "../components/layouts/PrivateLayout";
import GoalsPage from "../components/templates/GoalsPage";
import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { dehydrate } from "react-query/hydration";

interface IGoalsProps extends IWithDehydratedState {}

export default function Goals() {
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <PrivateLayout>
      <GoalsPage />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IGoalsProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};
