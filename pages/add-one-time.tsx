import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { AddIncomeExpressOneTime } from "../components/templates/AddIncomeOneTime";
import PrivateLayout from "../components/layouts/PrivateLayout";

interface IAddIncomeOneTimeProps extends IWithDehydratedState {}

export default function AddIncomeOneTimePage(props: IAddIncomeOneTimeProps) {
  return (
    <PrivateLayout>
      <AddIncomeExpressOneTime />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IAddIncomeOneTimeProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};
