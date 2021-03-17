import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { AddTranSMonthFDay } from "../components/templates/AddTranSMonthFDay";
import PrivateLayout from "../components/layouts/PrivateLayout";

interface IAddTranSMonthFDayProps extends IWithDehydratedState {}

export default function IAddTranSMonthFDayPage(props: IAddTranSMonthFDayProps) {
  return (
    <PrivateLayout>
      <AddTranSMonthFDay />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IAddTranSMonthFDayProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};