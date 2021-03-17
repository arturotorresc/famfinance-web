import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import parseISO from "date-fns/parseISO";
import formatDate from "date-fns/format";
import { Box, Text, Heading, Flex, Button, useToast } from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";
import { useQuery, useMutation } from "react-query";

export function ExpensePage() {
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;
  const { data } = useQuery(["expense", id], () =>
    fetcher
      .get("/expense", {
        params: {
          id,
        },
      })
      .then((res) => res.data)
  );
  const deleteMutation = useMutation((id) => fetcher.delete(`/expense/${id}`));

  if (!data) {
    return null;
  }

  if (data.expense.length === 0) {
    return (
      <Box>
        <Text textAlign="center" mt={10}>
          This expense does not exist or was deleted :(
        </Text>
      </Box>
    );
  }

  const expense = data.expense[0];
  const date = useMemo(
    () => formatDate(parseISO(expense.from), "do MMMM, yyyy"),
    [expense.from]
  );
  const createdAtDate = useMemo(
    () => formatDate(parseISO(expense.createdAt), "do MMMM, yyyy"),
    [expense.createdAt]
  );

  return (
    <Box>
      <Head>
        <title>{expense.title} - Expense</title>
      </Head>
      <Flex
        flexDir="column"
        boxShadow="lg"
        borderRadius="xl"
        mx="auto"
        mt={12}
        py={6}
        px={5}
        w={["95%", null, "90%", "650px"]}
      >
        <Text
          color="orange.300"
          fontStyle="italic"
          fontWeight={800}
          textAlign="center"
          fontSize="2xl"
        >
          {expense.category}
        </Text>
        <Heading textAlign="center" fontSize="5xl" mt={8}>
          {expense.title}
        </Heading>
        <Text mt={8} fontSize="4xl" textAlign="center" color="red.300">
          -{" "}
          {expense.qty.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
        <Text textAlign="center" fontSize="xl" fontWeight={800} mt={4}>
          <Text as="span" fontWeight={400}>
            Received on the
          </Text>{" "}
          {date}
        </Text>
        <Flex
          justifyContent="space-around"
          alignItems="center"
          fontStyle="italic"
          mt={10}
        >
          <Text>Added on the {createdAtDate}</Text>
          <Button
            onClick={() => {
              deleteMutation.mutate(expense._id, {
                onSuccess: () => {
                  toast({
                    status: "success",
                    title: "Expense deleted!",
                    description: `${expense.title} was deleted succesfully!`,
                  });
                  router.push("/dashboard");
                },
                onError: () => {
                  toast({
                    status: "error",
                    title: "Oops! Something ocurred!",
                    description: "Please try again!",
                  });
                },
              });
            }}
            colorScheme="red"
          >
            Delete Expense
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
