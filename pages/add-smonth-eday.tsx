import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
import { IWithDehydratedState } from "../types/IWithDehydratedState";
import { dehydrate } from "react-query/hydration";
import { AddTranSMonthEDay } from "../components/templates/AddTranSMonthEDay";
import PrivateLayout from "../components/layouts/PrivateLayout";

interface IAddTranSMonthEDayProps extends IWithDehydratedState {}

export default function IAddTranSMonthEDayPage(props: IAddTranSMonthEDayProps) {
  return (
    <PrivateLayout>
      <AddTranSMonthEDay />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IAddTranSMonthEDayProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};
