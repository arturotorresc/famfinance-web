import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../lib/redirectToLogin";
import { IWithDehydratedState } from "../../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { TransactionFormPage } from "../../components/templates/TransactionFormPage";
import PrivateLayout from "../../components/layouts/PrivateLayout";

interface IIncomeFormPageProps extends IWithDehydratedState {}

export default function EditIncomePage(props: IIncomeFormPageProps) {
  return (
    <PrivateLayout>
      <TransactionFormPage query="edit" transactionType="income" />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IIncomeFormPageProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};