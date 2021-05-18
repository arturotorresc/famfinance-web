import Head from "next/head";
import { Flex, Heading, Box } from "@chakra-ui/react";
import { TransactionCharts } from "./TransactionCharts";
import ForecastCharts from "./ForecastCharts";

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
      <Box mb={40}>
        <TransactionCharts />
      </Box>
      <Flex width="100%" justifyContent="space-around">
        <ForecastCharts />
      </Flex>
    </Flex>
  );
}
