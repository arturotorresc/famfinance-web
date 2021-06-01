import DashboardPage from "../components/templates/DashboardPage";
import PrivateLayout from "../components/layouts/PrivateLayout";
import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { dehydrate } from "react-query/hydration";

interface IDashboardProps extends IWithDehydratedState {}

export default function Dashboard() {
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <PrivateLayout>
      <DashboardPage />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IDashboardProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};
