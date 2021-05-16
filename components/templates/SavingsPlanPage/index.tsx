import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";

interface IRequirement {
  qty: number;
  title: string;
  deadline: Date;
}

interface IContribution {
  contribution: number;
  goal_title: string;
}

interface IPlanData {
  contributions: IContribution[];
}

interface ISavingsData {
  plan: IPlanData[];
  requirements: IRequirement[];
}

function formatDate(date: Date) {
  let myDate = new Date(date);
  let day = myDate.getDate().toString();
  let month = (myDate.getMonth() + 1).toString();
  let year = myDate.getFullYear().toString();
  if (day.length == 1) day = "0" + day;
  if (month.length == 1) month = "0" + month;
  return day + "-" + month + "-" + year;
}

export default function SavingsPlanPage() {
  let initialRequirements: IRequirement[] = [];
  let initialPlan: IPlanData[] = [];
  const [requirements, setRequirements] = useState(initialRequirements);
  const [planDistribution, setPlanDistribution] = useState(initialPlan);

  useEffect(() => {
    fetcher
      .get<ISavingsData>("/savingsPlan?length=260")
      .then((data) => {
        setRequirements(data.data.requirements);
        setPlanDistribution(data.data.plan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const alerts = requirements.map((requirement: IRequirement, idx: number) => {
    return Math.abs(requirement.qty) > 0.01 ? (
      <Alert status="warning" key={idx}>
        <AlertIcon />
        Necesitas obtener un ingreso de al menos ${requirement.qty.toFixed(
          2
        )}{" "}
        MXN para cumplir la meta "{requirement.title}" antes de la fecha{" "}
        {formatDate(requirement.deadline)}
      </Alert>
    ) : null;
  });

  const savingsPlan = planDistribution.map((weekPlan, idx) => {
    const contributionText = weekPlan.contributions.map((contribution) => {
      return Math.abs(contribution.contribution) > 0.01 ? (
        <VStack alignItems="left">
          <Text>Ahorro: ${contribution.contribution.toFixed(2)} MXN</Text>
          <Text>Meta: {contribution.goal_title}</Text>
        </VStack>
      ) : null;
    });
    return (
      <Box p={5}>
        <Flex>
          <VStack alignItems="left">
            <Heading fontSize="l">
              Semana {idx}
              {idx ? "" : " (actual)"}
            </Heading>
            {contributionText}
          </VStack>
        </Flex>
        <Divider margin="15px 5px" />
      </Box>
    );
  });

  return (
    <Flex flexDir="column">
      <Head>
        <title>Plan de Ahorro</title>
      </Head>
      <Heading
        textAlign="center"
        fontSize={["4xl", null, "6xl"]}
        pb={6}
        pt={10}
      >
        Plan de Ahorro
      </Heading>
      <Flex flexDir="column">
        <Stack spacing={3}>{alerts}</Stack>
        {savingsPlan}
      </Flex>
    </Flex>
  );
}
