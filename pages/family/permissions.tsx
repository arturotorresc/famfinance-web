import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate } from "react-query/hydration";
import { checkIfLoggedIn } from "../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../lib/redirectToLogin";
import { IWithDehydratedState } from "../../types/IWithDehydratedState";
import { FamilyPermissionsPage } from "../../components/templates/FamilyPermissionsPage";
import PrivateLayout from "../../components/layouts/PrivateLayout";

interface IProps extends IWithDehydratedState {}

export default function PermissionsPage() {
  return (
    <PrivateLayout>
      <FamilyPermissionsPage />
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
