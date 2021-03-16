import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, Box, useToast, Heading } from "@chakra-ui/react";
import CreateForm from "./CreateForm";
import { GetServerSideProps } from "next";
import { checkIfLoggedIn } from "../../../lib/checkIfLoggedIn";
import { redirectToLogin } from "../../../lib/redirectToLogin";
import { IWithDehydratedState } from "../../../types/IWithDehydratedState";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { dehydrate } from "react-query/hydration";

interface IValues{
  title: string;
  deadline: Date;
  description: string;
  qty: number;
}

interface ICreateGoalProps extends IWithDehydratedState {}

export default function CreateGoal() {
  const mutation = useMutation((goalData: IValues) =>
    fetcher.post("/goal", goalData)
  );
  const toast = useToast();

  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }


  return (
    <Flex flexDir="column">
      <Head>
        <title>create | Goal</title>
      </Head>

      <Box w={["100%"]} px={1}>
        <Heading
          textAlign="center"
          fontSize={["4xl", null, "6xl"]}
          pb={6}
          pt={10}
        >
          Create a new Goal
        </Heading>
      </Box>
      <Flex
        w={["100%", null, "80%", "550px"]}
        mt={3}
        mx="auto"
        flexDir="column"
        p={[3]}
        mb={6}
        boxShadow="lg"
      >
        <CreateForm
          initialValues={{
            title: "",
            description: "",
            deadline: new Date(),
            qty: 0
          }}
          onSubmit={(vals, actions) => {
            mutation.mutate(
              {
                title: vals.title,
                description: vals.description,
                deadline: vals.deadline,
                qty: vals.qty
              },
              {
                onSuccess: (res) => {
                  toast({
                    title: "Goal created!",
                    description:
                      "You have succesfully registered a new goal ",
                    status: "success",
                  });
                  actions.setSubmitting(false);
                },
                onError: (error) => {
                  toast({
                    title: "Oops!",
                    description: "An error has ocurred! Please try again!",
                    status: "error",
                  });
                  actions.setSubmitting(false);
                },
              }
            );
          }}
        />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { isLoggedIn, queryClient } = await checkIfLoggedIn(ctx);
  if (!isLoggedIn) {
    return redirectToLogin();
  }
  const props: ICreateGoalProps = {
    dehydratedState: dehydrate(queryClient),
  };
  return { props };
};