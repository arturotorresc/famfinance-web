import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import GoalStask from "./GoalStack";
import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../../lib/redirectToLogin";
import { IWithDehydratedState } from "../../../types/IWithDehydratedState";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { dehydrate } from "react-query/hydration";

interface IGoalProps extends IWithDehydratedState {}

export default function Goal() {

  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <Flex flexDir="column">
      <Head>
        <title>Goals</title>
      </Head>

      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Goals
      </Heading>

      <Flex
        w={["100%", null, "80%", null]}
        mt={3}
        mx="auto"
        flexDir="column"
        p={[3]}
        mb={6}
        boxShadow="lg"
      >
        <GoalStask></GoalStask>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: IGoalProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};