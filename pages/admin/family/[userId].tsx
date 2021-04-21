import React from "react";
import PrivateLayout from "../../../components/layouts/PrivateLayout";
import { AdminFamilyUserPageTemplate } from "../../../components/templates/AdminFamilyUserPage";
import { GetServerSideProps } from "next";
import { dehydrate } from "react-query/hydration";
import { checkIfLoggedIn } from "../../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../../lib/redirectToLogin";
import { IWithDehydratedState } from "../../../types/IWithDehydratedState";

interface IProps extends IWithDehydratedState {}

export default function AdminFamilyUserPage() {
  return (
    <PrivateLayout>
      <AdminFamilyUserPageTemplate />
    </PrivateLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return {
    props,
  };
};
