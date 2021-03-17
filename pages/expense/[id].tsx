import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate } from "react-query/hydration";
import { checkIfLoggedIn } from "../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../lib/redirectToLogin";
import { IWithDehydratedState } from "../../types/IWithDehydratedState";
import { ExpensePage as ExpensePageTemplate } from "../../components/templates/ExpensePage";
import PrivateLayout from "../../components/layouts/PrivateLayout";
import { createServerSideFetcher } from "../../fetchers/serverSideFetcher";

interface IProps extends IWithDehydratedState {}

export default function ExpensePage(props: IProps) {
  return (
    <PrivateLayout>
      <ExpensePageTemplate />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const { id } = ctx.query;
  const fetcher = createServerSideFetcher(ctx);
  await queryClient.prefetchQuery(["expense", id], () =>
    fetcher
      .get("/expense", {
        params: {
          id,
        },
      })
      .then((res) => res.data)
  );
  const props: IProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return {
    props,
  };
};
