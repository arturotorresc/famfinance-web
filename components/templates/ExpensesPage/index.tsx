import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import ExpensesStack from "./ExpensesStack"

export default function ExpensesPage() {
  return (
    <Flex flexDir="column">
      <Head>
        <title>Gastos</title>
      </Head>

      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Gastos
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
        <ExpensesStack />
      </Flex>

    </Flex>
  );
}
