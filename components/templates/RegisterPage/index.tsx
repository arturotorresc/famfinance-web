import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";
import FeaturesText from "./FeaturesText";
import RegisterForm from "./RegisterForm";

export default function Register() {
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
          onSubmit={(vals, actions) => {}}
        />
      </Flex>
    </Flex>
  );
}
