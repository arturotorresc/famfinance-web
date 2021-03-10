import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return <div>hola</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isLoggedIn = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IDashboardProps = {};
  return { props };
};
