import Head from "next/head";
import { Box, Heading } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box>
      <Head>
        <title>Welcome to Famfinance!</title>
      </Head>
      <Heading fontSize="5xl" textAlign="center" pt={20}>
        Welcome to Famfinance!
      </Heading>
    </Box>
  );
}
