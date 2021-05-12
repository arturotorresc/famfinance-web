import { useState } from "react";
import Head from "next/head";
import { Flex, Heading } from "@chakra-ui/react";
import ExpensesStack from "./ExpensesStack";
import { FilterByCategory } from "../../modules/FilterByCategory";
import { TransactionCategoryEnum } from "../TransactionFormPage/types";
import { SELECT_AN_OPTION_VALUE } from "../../../constants";

export default function ExpensesPage() {
  const [category, setCategory] = useState<
    TransactionCategoryEnum | typeof SELECT_AN_OPTION_VALUE
  >(SELECT_AN_OPTION_VALUE);
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
        <ExpensesStack categoryFilter={category} />
      </Flex>
    </Flex>
  );
}
