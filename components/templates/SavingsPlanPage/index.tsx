import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";

export default function SavingsPlanPage() {
  return (
    <Flex flexDir="column">
      <Head>
        <title>Plan de Ahorro</title>
      </Head>

      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Plan de Ahorro
      </Heading>
    </Flex>
  );
}
