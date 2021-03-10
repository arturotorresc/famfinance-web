import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, Box, useToast } from "@chakra-ui/react";
import FeaturesText from "./FeaturesText";
import RegisterForm, { IValues } from "./RegisterForm";

export default function Register() {
  const mutation = useMutation((userData: IValues) =>
    fetcher.post("/users", userData)
  );
  const toast = useToast();
  return (
    <Flex flexDir="column">
      <Head>
        <title>Register | Famfinance</title>
      </Head>

      <Box w={["100%"]} px={1}>
        <FeaturesText />
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
        <RegisterForm
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(vals, actions) => {
            mutation.mutate(
              {
                name: vals.name,
                email: vals.email,
                password: vals.password,
                confirmPassword: vals.confirmPassword,
              },
              {
                onSuccess: (res) => {
                  toast({
                    title: "Account created!",
                    description:
                      "You have succesfully registered with Famfinance, " +
                      res.data.user.name,
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
