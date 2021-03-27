import React from "react";
import Head from "next/head";
import parseDate from "date-fns/parse";
import {
  Box,
  Heading,
  Flex,
  useToast,
  Container,
  Divider,
} from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";
import { useMutation } from "react-query";
import { AddIncomeForm } from "./AddIncomeForm";

export function AddIncome() {
  const mutation = useMutation((data: any) => fetcher.post("/income", data));
  const toast = useToast();
  return (
    <Box w="100%">
      <Head>
        <title>Agregar Ingreso</title>
      </Head>
      <Container
        marginTop="20px"
        padding="50px"
        border="1px"
        borderRadius="30px"
      >
        <Heading as="h2" textAlign="center">
          Agrega un Ingreso
        </Heading>
        <Divider margin="20px 0px" />
        <Flex
          justifyContent="center"
          flexDir="column"
          w={["100%", null, "90%", "500px"]}
          mx="auto"
          px={6}
        >
          <AddIncomeForm
            initialValues={{
              title: "",
              quantity: 0,
              category: "",
              startDate: "",
              endDate: "",
              day: 1,
              weekDay: "",
              weeksRepeat: 1,
              monthsRepeat: 1,
              months: [""],
              startEndMonth: "",
            }}
            onSubmit={(vals, actions) => {
              const startDate = parseDate(
                vals.startDate,
                "dd-MM-yyyy",
                new Date()
              );
              const endDate = parseDate(vals.endDate, "dd-MM-yyyy", new Date());
              const data = {
                title: vals.title,
                qty: vals.quantity,
                category: vals.category,
                from: startDate,
                to: endDate,
                day: vals.day,
                weekDay: vals.weekDay,
                weeksRepear: vals.weeksRepeat,
                monthsRepear: vals.monthsRepeat,
                months: vals.months,
                startEndMonth: vals.startEndMonth,
              };
              mutation.mutate(data, {
                onSuccess: () => {
                  toast({ status: "success", title: "Ingreso agregado" });
                },
                onError: () => {
                  toast({ status: "error", title: "Ha ocurrido un error!" });
                },
              });
              actions.setSubmitting(false);
            }}
          />
        </Flex>
      </Container>
    </Box>
  );
}
