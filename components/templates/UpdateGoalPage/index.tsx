import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, Box, useToast, Heading } from "@chakra-ui/react";
import UpdateForm from "./UpdateForm";
import { useRouter } from "next/router";

interface IValues{
  _id: string;
  title: string;
  deadline: Date;
  description: string;
  qty: number;
}

export default function UpdateGoal() {
  const mutation = useMutation((goalData: IValues) =>
    fetcher.put("/goal", goalData)
  );
  const toast = useToast();

  const router = useRouter();

  const data: IValues = router.query;

  return (
    <Flex flexDir="column">
      <Head>
        <title>update | Goal</title>
      </Head>

      <Box w={["100%"]} px={1}>
        <Heading
          textAlign="center"
          fontSize={["4xl", null, "6xl"]}
          pb={6}
          pt={10}
        >
          Update Goal
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
        <UpdateForm
          initialValues={{
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            qty: data.qty
          }}
          onSubmit={(vals, actions) => {
            mutation.mutate(
              {
                _id: data._id,
                title: vals.title,
                description: vals.description,
                deadline: vals.deadline,
                qty: vals.qty
              },
              {
                onSuccess: (res) => {
                  toast({
                    title: "Goal updated!",
                    description:
                      "You have succesfully updated the goal ",
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
