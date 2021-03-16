import React from "react";
import Head from "next/head";
import parseDate from "date-fns/parse";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";
import { useMutation } from "react-query";
import { AddIncomeExpenseOneTimeForm } from "./AddIncomeExpenseOneTimeForm";

export function AddIncomeExpressOneTime() {
  const incomeMutation = useMutation((data: any) =>
    fetcher.post("/income", data)
  );
  const expenseMutation = useMutation((data: any) =>
    fetcher.post("/expense", data)
  );
  const toast = useToast();
  return (
    <Box w="100%">
      <Head>
        <title>Add a one time finance</title>
      </Head>
      <Heading textAlign="center" fontSize="5xl" pt={8}>
        Add a one time expense or income
      </Heading>
      <Flex
        justifyContent="center"
        flexDir="column"
        w={["100%", null, "90%", "500px"]}
        mx="auto"
        boxShadow="lg"
        px={6}
        py={10}
        mt={10}
        borderRadius="lg"
      >
        <AddIncomeExpenseOneTimeForm
          initialValues={{
            title: "",
            quantity: 0,
            startDate: "",
            category: "",
            movementType: "income",
          }}
          onSubmit={(vals, actions) => {
            const startDate = parseDate(
              vals.startDate,
              "dd-MM-yyyy",
              new Date()
            );
            const data = {
              title: vals.title,
              qty: vals.quantity,
              from: startDate,
              category: vals.category,
            };
            if (vals.movementType === "income") {
              incomeMutation.mutate(data, {
                onSuccess: () => {
                  toast({ status: "success", title: "Income added" });
                },
                onError: () => {
                  toast({ status: "error", title: "An error ocurred!" });
                },
              });
            } else {
              expenseMutation.mutate(data, {
                onSuccess: () => {
                  toast({ status: "success", title: "Expense added" });
                },
                onError: () => {
                  toast({ status: "error", title: "An error ocurred!" });
                },
              });
            }
            actions.setSubmitting(false);
          }}
        />
      </Flex>
    </Box>
  );
}
