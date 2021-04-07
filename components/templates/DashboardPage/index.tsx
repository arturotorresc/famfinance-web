import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import { TransactionCharts } from "./TransactionCharts";

export default function DashboardPage() {
  return (
    <Flex flexDir="column">
      <Head>
        <title>Dashboard - Famfinance</title>
      </Head>

      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Dashboard
      </Heading>
      <TransactionCharts />
    </Flex>
  );
}
