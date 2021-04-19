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
import { IncomeType } from "./types";

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
              startDate: null,
              endDate: null,
              frequencyType: IncomeType.OneTime,
              day: null,
              weekDay: null,
              weeksRepeat: null,
              monthsRepeat: null,
              months: null,
              startEndMonth: null,
            }}
            onSubmit={(vals, actions) => {
              const startDate = parseDate(
                vals.startDate ? vals.startDate : "13-04-2021", // CHANGE TO TODAY
                "dd-MM-yyyy",
                new Date()
              );
              const endDate = parseDate(
                vals.endDate ? vals.endDate : "31-12-2040",
                "dd-MM-yyyy",
                new Date()
              );
              const data = {
                title: vals.title,
                qty: vals.quantity,
                category: vals.category,
                from: startDate,
                until: endDate,
                frequencyType: vals.frequencyType,
                day: vals.day,
                weekDay: vals.weekDay,
                weeksRepeat: vals.weeksRepeat,
                monthsRepeat: vals.monthsRepeat,
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
