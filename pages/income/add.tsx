import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../lib/redirectToLogin";

interface IAddIncomeProps {}

export default function AddIncome(props: IAddIncomeProps) {
  return <div>hola</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isLoggedIn = await checkIfLoggedIn();
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IAddIncomeProps = {};
  return { props };
};
