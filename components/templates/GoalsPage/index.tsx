import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import GoalsStack from "./GoalsStack";

export default function GoalsPage() {
  return (
    <Flex flexDir="column">
      <Head>
        <title>Metas</title>
      </Head>

      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Metas
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
        <GoalsStack />
      </Flex>
    </Flex>
  );
}
