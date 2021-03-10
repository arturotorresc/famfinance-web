import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../lib/checkIfLoggedIn";
import { redirectToLogin } from "../lib/redirectToLogin";
interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return <div>hola</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isLoggedIn = await checkIfLoggedIn();
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IDashboardProps = {};
  return { props };
};
