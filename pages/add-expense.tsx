import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { TransactionFormPage } from "../components/templates/TransactionFormPage";
import PrivateLayout from "../components/layouts/PrivateLayout";

interface IExpenseFormPageProps extends IWithDehydratedState {}

export default function AddExpensePage(props: IExpenseFormPageProps) {
  return (
    <PrivateLayout>
      <TransactionFormPage query="add" transactionType="expense" />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IExpenseFormPageProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};
