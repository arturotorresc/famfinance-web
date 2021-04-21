import React from "react";
import {
  Box,
  Spinner,
  Text,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";
import { useQuery } from "react-query";
import { UserCard } from "./UserCard";

export function AdminFamilyPage() {
  const { data, isLoading, isError } = useQuery("/users", () =>
    fetcher.get("/users").then((res) => res.data)
  );

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Text>Cargando a mi familia...</Text>
        <Spinner />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Text>Ocurrió un error al obtener a la familia...</Text>
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading textAlign="center" mt={10} fontSize="5xl">
        Administración de mi familia
      </Heading>
      <Box w="900px" mx="auto">
        <Text mt={10} fontSize="xl" textAlign="right">
          {data.users.length} integrantes en mi familia
        </Text>
        <SimpleGrid columns={2} spacing={10} mt={8}>
          {data.users.map((user: any) => {
            return (
              <UserCard
                key={user._id}
                userId={user._id}
                name={user.name}
                email={user.email}
                role={user.role}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
