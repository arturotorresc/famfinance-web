import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface IDashboardProps extends IWithDehydratedState {}

export default function Dashboard(props: IDashboardProps) {
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return <div>Protected Page Only Logged In Users {user.name}</div>;
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
