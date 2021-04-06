import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { AddIncome } from "../components/templates/AddIncome";
import PrivateLayout from "../components/layouts/PrivateLayout";

interface IAddIncomeProps extends IWithDehydratedState {}

export default function AddIncomePage(props: IAddIncomeProps) {
  return (
    <PrivateLayout>
      <AddIncome />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IAddIncomeProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};
