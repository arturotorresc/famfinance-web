import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { Chart } from "react-charts";
import fetcher from "../../../../fetchers/fetcher";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

interface IWeeklyStatsData {
  weeklyStats: number[];
}

interface IMonthlyStatsData {
  monthlyStats: number[];
}

interface IYearlyStatsData {
  yearlyStats: number[];
}

export default function ForecastCharts() {
  const [weeklyData, setWeeklyData] = useState(new Array(10).fill(1));
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(1));
  const [yearlyData, setYearlyData] = useState(new Array(5).fill(1));

  useEffect(() => {
    fetcher
      .get<IWeeklyStatsData>("/weeklyStats?length=10")
      .then((res) => {
        let data_to_set = res.data.weeklyStats.map((qty) => {
          return qty == 0 ? 0.01 : qty;
        });
        setWeeklyData(data_to_set);
      })
      .catch((error) => {
        console.log(error);
      });

    fetcher
      .get<IMonthlyStatsData>("/monthlyStats")
      .then((res) => {
        let data_to_set = res.data.monthlyStats.map((qty) => {
          return qty == 0 ? 0.01 : qty;
        });
        setMonthlyData(data_to_set);
      })
      .catch((error) => {
        console.log(error);
      });

    fetcher
      .get<IYearlyStatsData>("/yearlyStats")
      .then((res) => {
        let data_to_set = res.data.yearlyStats.map((qty) => {
          return qty == 0 ? 0.01 : qty;
        });
        setYearlyData(data_to_set);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const weekly_chart_data = [
    {
      data: weeklyData.map((qty: number, idx: number) => {
        return {
          primary: `Semana ${idx}${idx ? "" : " (actual)"}`,
          secondary: qty,
          radius: undefined,
        };
      }),
    },
  ];

  const MONTHS = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiempre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let curMonthIdx = new Date().getMonth();
  const monthly_chart_data = [
    {
      data: monthlyData.map((qty: number, idx: number) => {
        return {
          primary: MONTHS[(idx + curMonthIdx) % 12],
          secondary: qty,
          radius: undefined,
        };
      }),
    },
  ];

  let curYear = new Date().getFullYear();
  const yearly_chart_data = [
    {
      data: yearlyData.map((qty: number, idx: number) => {
        return {
          primary: curYear + idx,
          secondary: qty,
          radius: undefined,
        };
      }),
    },
  ];

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false },
    ],
    []
  );

  const weeklyChart = (
    <Chart data={weekly_chart_data} series={series} axes={axes} tooltip />
  );
  const monthlyChart = (
    <Chart data={monthly_chart_data} series={series} axes={axes} tooltip />
  );
  const yearlyChart = (
    <Chart data={yearly_chart_data} series={series} axes={axes} tooltip />
  );

  return (
    <Box w="75%">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Semanal</Tab>
          <Tab>Mensual</Tab>
          <Tab>Anual</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box h="500px" w="100%">
              {weeklyChart}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box h="500px" w="100%">
              {monthlyChart}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box h="500px" w="100%">
              {yearlyChart}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
