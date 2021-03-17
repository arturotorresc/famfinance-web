import React from "react";
import Head from "next/head";
import parseDate from "date-fns/parse";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";
import { useMutation } from "react-query";
import { AddTranSMonthEDayForm } from "./AddTranSMonthEDayForm";

export function AddTranSMonthEDay () {
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
        <title>Agregar Transacción</title>
      </Head>
      <Heading textAlign="center" fontSize="5xl" pt={8}>
        Agrega una Transacción Recurrente | Inicio/Fin de Mes en Grupo Selecto de Meses
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
        <AddTranSMonthEDayForm
          initialValues={{
            title: "",
            quantity: 0,
            startDate: "",
            endDate: "",
            category: "",
            movementType: "income",
            dayType: "start",
            months: [""],
          }}
          onSubmit={(vals, actions) => {
            const startDate = parseDate(
              vals.startDate,
              "dd-MM-yyyy",
              new Date()
            );
            const endDate = parseDate(
                vals.endDate,
                "dd-MM-yyyy",
                new Date()
            );
            const data = {
              title: vals.title,
              qty: vals.quantity,
              from: startDate,
              until: endDate,
              category: vals.category,
            };
            if (vals.movementType === "income") {
              incomeMutation.mutate(data, {
                onSuccess: () => {
                  toast({ status: "success", title: "Inngreso agregado" });
                },
                onError: () => {
                  toast({ status: "error", title: "Ha ocurrido un error!" });
                },
              });
            } else {
              expenseMutation.mutate(data, {
                onSuccess: () => {
                  toast({ status: "success", title: "Gasto agregado" });
                },
                onError: () => {
                  toast({ status: "error", title: "Ha ocurrido un error!" });
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
