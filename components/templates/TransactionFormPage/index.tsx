import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import { TransactionForm } from "./TransactionForm";
import { FrequencyType } from "./types";

interface IProps {
  query: string;
  transactionType: string;
}

interface IFrequency {
  _id: string;
  frequencyType: string;
  day: number;
  weekDay: string;
  weeksRepeat: number;
  monthsRepeat: number;
  months: string[];
  startEndMonth: string;
}

interface ITransaction {
  _id: string;
  title: string;
  category: string;
  from: string;
  until: string;
  qty: number;
  frequency: IFrequency;
  belongsTo: string;
}

interface IIncomeData {
  income: ITransaction;
}

interface IExpenseData {
  expense: ITransaction;
}

function formatDate(date: Date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();
  if (day.length == 1) day = "0" + day;
  if (month.length == 1) month = "0" + month;
  return day + "-" + month + "-" + year;
}

export function TransactionFormPage(props: IProps) {
  const router = useRouter();
  const { id } = router.query;

  const getMutation = () => {
    if (props.transactionType == "income") {
      return props.query == "add"
        ? useMutation((data: any) => fetcher.post("/income", data))
        : useMutation((data: any) => fetcher.put("/income/" + id, data));
    } else {
      return props.query == "add"
        ? useMutation((data: any) => fetcher.post("/expense", data))
        : useMutation((data: any) => fetcher.put("/expense/" + id, data));
    }
  };

  const mutation = getMutation();
  const toast = useToast();

  const [initialValues, setInitialValues] = useState({
    title: "",
    quantity: 0,
    category: "",
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    frequencyType: FrequencyType.OneTime,
    day: 1,
    weekDay: "Lunes",
    weeksRepeat: 1,
    monthsRepeat: 1,
    months: Array<string>(),
    startEndMonth: "Inicio",
  });

  const stringToIncomeType = (s: string) => {
    switch (s) {
      case "Única ocasión":
        return FrequencyType.OneTime;
      case "Recurrente: Mismo día de la semana cada N semanas":
        return FrequencyType.SameWeekDayRepeatForWeeks;
      case "Recurrente: Inicio o fin de mes cada N meses":
        return FrequencyType.StartEndDayRepeatMonths;
      case "Recurrente: Inicio o fin de mes en meses selectos":
        return FrequencyType.StartEndDaySelectedMonths;
      case "Recurrente: Mismo día del mes, cada N meses":
        return FrequencyType.SameDayRepeatMonths;
      case "Recurrente: Mismo día del mes en meses selectos":
        return FrequencyType.SameDaySelectedMonths;
      default:
        return FrequencyType.OneTime;
    }
  };

  useEffect(() => {
    // make the call
    if (props.query == "edit") {
      if (props.transactionType == "income") {
        fetcher
          .get<IIncomeData>("/income/" + id)
          .then((data) => {
            const transaction = data.data.income;
            setInitialValues({
              title: transaction.title,
              quantity: transaction.qty,
              category: transaction.category,
              startDate: formatDate(new Date(transaction.from)),
              endDate: formatDate(new Date(transaction.until)),
              frequencyType: stringToIncomeType(
                transaction.frequency.frequencyType
              ),
              day: transaction.frequency.day,
              weekDay: transaction.frequency.weekDay,
              weeksRepeat: transaction.frequency.weeksRepeat,
              monthsRepeat: transaction.frequency.monthsRepeat,
              months: transaction.frequency.months,
              startEndMonth: transaction.frequency.startEndMonth,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        fetcher
          .get<IExpenseData>("/expense/" + id)
          .then((data) => {
            const transaction = data.data.expense;
            setInitialValues({
              title: transaction.title,
              quantity: transaction.qty,
              category: transaction.category,
              startDate: formatDate(new Date(transaction.from)),
              endDate: formatDate(new Date(transaction.until)),
              frequencyType: stringToIncomeType(
                transaction.frequency.frequencyType
              ),
              day: transaction.frequency.day,
              weekDay: transaction.frequency.weekDay,
              weeksRepeat: transaction.frequency.weeksRepeat,
              monthsRepeat: transaction.frequency.monthsRepeat,
              months: transaction.frequency.months,
              startEndMonth: transaction.frequency.startEndMonth,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  return (
    <Box w="100%">
      <Head>
        <title>
          {props.query == "add" ? "Agregar" : "Editar"}{" "}
          {props.transactionType == "income" ? "Ingreso" : "Gasto"}
        </title>
      </Head>
      <Container
        marginTop="20px"
        padding="50px"
        border="1px"
        borderRadius="30px"
      >
        <Heading as="h2" textAlign="center">
          {props.query == "add" ? "Agrega" : "Edita"} un{" "}
          {props.transactionType == "income" ? "Ingreso" : "Gasto"}
        </Heading>
        <Divider margin="20px 0px" />
        <Flex
          justifyContent="center"
          flexDir="column"
          w={["100%", null, "90%", "500px"]}
          mx="auto"
          px={6}
        >
          <TransactionForm
            initialValues={initialValues}
            onSubmit={(vals, actions) => {
              const startDate = parseDate(
                vals.startDate ? vals.startDate : formatDate(new Date()),
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
                  if (props.query == "add") {
                    toast({
                      status: "success",
                      title:
                        (props.transactionType == "income"
                          ? "Ingreso"
                          : "Gasto") + " agregado",
                    });
                  } else {
                    toast({
                      status: "success",
                      title:
                        (props.transactionType == "income"
                          ? "Ingreso"
                          : "Gasto") + " actualizado",
                    });
                  }
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
