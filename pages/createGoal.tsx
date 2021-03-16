import CreateGoalPage from "../components/templates/CreateGoalPage";
import PublicLayout from "../components/layouts/PublicLayout";
import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { dehydrate } from "react-query/hydration";

interface ICreateGoalProps extends IWithDehydratedState {}

export default function Goal() {

    const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <PublicLayout>
      <CreateGoalPage />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
    if (!isLoggedIn) {
      return redirectToLogin();
    }
    const props: ICreateGoalProps = {
      dehydratedState: dehydrate(queryClient),
    };
    return { props };
  };
