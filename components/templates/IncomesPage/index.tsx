import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import IncomesStack from "./IncomesStack";

export default function IncomesPage() {
  return (
    <Flex flexDir="column">
      <Head>
        <title>Ingresos</title>
      </Head>

      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Ingresos
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
        <IncomesStack />
      </Flex>
    </Flex>
  );
}
