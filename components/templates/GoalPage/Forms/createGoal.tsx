import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../../fetchers/fetcher";
import { Flex, Box, useToast, Heading } from "@chakra-ui/react";
import CreateForm from "./CreateForm";

interface IValues{
  title: string;
  deadline: Date;
  description: string;
  qty: number;
  belongsTo: String;
}

export default function CreateGoal() {
  const mutation = useMutation((goalData: IValues) =>
    fetcher.post("/api/goal", goalData)
  );
  const toast = useToast();
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
                qty: vals.qty,
                belongsTo: "6036a74a0bf4d1d2948ad957"
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
