import React, { useMemo } from "react";
import { Flex, Text, Spinner, Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Chart } from "react-charts";
import parseISO from "date-fns/parseISO";
import toJSDate from "date-fns/toDate";
import isAfter from "date-fns/isAfter";
import fetcher from "../../../../fetchers/fetcher";

export function TransactionCharts() {
  const { data: expenseData, isLoading: expenseIsLoading } = useQuery(
    "/expense/history",
    () => fetcher.get("/expense/history").then((res) => res.data)
  );
  const { data: incomeData, isLoading: incomeIsLoading } = useQuery(
    "/income/history",
    () => fetcher.get("/income/history").then((res) => res.data)
  );

  const expenseChartData = useMemo(() => {
    if (!expenseData) {
      return [];
    }
    const sorted = expenseData.expenses.sort((a: any, b: any) => {
      let aDate = parseISO(a.from || a.createdAt);
      let bDate = parseISO(b.from || b.createdAt);
      if (isAfter(aDate, bDate)) {
        return 1;
      } else {
        return -1;
      }
    });
    return [
      {
        label: "Expense",
        data: sorted.map((expense: any) => {
          let date;
          if (expense.from) {
            date = toJSDate(parseISO(expense.from));
          } else {
            date = toJSDate(parseISO(expense.createdAt));
          }
          return [date, expense.qty];
        }),
      },
    ];
  }, [expenseData]);

  const incomeChartData = useMemo(() => {
    if (!incomeData) {
      return [];
    }
    const sorted = incomeData.incomes.sort((a: any, b: any) => {
      let aDate = parseISO(a.from || a.createdAt);
      let bDate = parseISO(b.from || b.createdAt);
      if (isAfter(aDate, bDate)) {
        return 1;
      } else {
        return -1;
      }
    });
    return [
      {
        label: "Income",
        data: sorted.map((income: any) => {
          let date;
          if (income.from) {
            date = toJSDate(parseISO(income.from));
          } else {
            date = toJSDate(parseISO(income.createdAt));
          }
          return [date, income.qty];
        }),
      },
    ];
  }, [incomeData]);

  const axes = useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  if (expenseIsLoading || incomeIsLoading) {
    return <Spinner />;
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="900px"
      w="800px"
      mx="auto"
    >
      {expenseData && expenseData.expenses.length > 0 && (
        <Box h="400px" w="800px">
          <Text fontSize="2xl" mb={3} mt={10} style={{textAlign: "center"}}>
            Historial de tus gastos
          </Text>
          <Chart
            primaryAxisType="utc"
            data={expenseChartData}
            axes={axes}
            tooltip
          />
        </Box>
      )}
      {incomeData && incomeData.incomes.length > 0 && (
        <Box pt={10} mt={12} h="400px" w="800px" pb={10}>
          <Text fontSize="2xl" mb={3} mt={10} style={{textAlign: "center"}}>
            Historial de tus ingresos
          </Text>
          <Chart
            primaryAxisType="utc"
            data={incomeChartData}
            axes={axes}
            tooltip
          />
        </Box>
      )}
    </Flex>
  );
}
