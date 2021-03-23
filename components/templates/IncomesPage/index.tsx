import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";

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
    </Flex>
  );
}
