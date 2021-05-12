import { useState } from "react";
import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import IncomesStack from "./IncomesStack";
import { FilterByCategory } from "../../modules/FilterByCategory";
import { TransactionCategoryEnum } from "../TransactionFormPage/types";
import { SELECT_AN_OPTION_VALUE } from "../../../constants";

export default function IncomesPage() {
  const [category, setCategory] = useState<
    TransactionCategoryEnum | typeof SELECT_AN_OPTION_VALUE
  >(SELECT_AN_OPTION_VALUE);
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
      >
        <FilterByCategory
          handleSelect={(val) => {
            setCategory(val);
          }}
        />
      </Flex>
      <Flex
        w={["100%", null, "80%", null]}
        mt={3}
        mx="auto"
        flexDir="column"
        p={[3]}
        mb={6}
        boxShadow="lg"
      >
        <IncomesStack categoryFilter={category} />
      </Flex>
    </Flex>
  );
}
