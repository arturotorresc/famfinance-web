import UpdateGoalPage from "../components/templates/UpdateGoalPage";
import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { dehydrate } from "react-query/hydration";
import PrivateLayout from "../components/layouts/PrivateLayout";

interface IUpdateGoalProps extends IWithDehydratedState {}

export default function Goal() {

    const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <PrivateLayout>
      <UpdateGoalPage />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
    if (!isLoggedIn) {
      return redirectToLogin();
    }
    const props: IUpdateGoalProps = {
      dehydratedState: dehydrate(queryClient),
    };
    return { props };
  };
