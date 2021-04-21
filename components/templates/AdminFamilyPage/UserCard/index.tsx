import React from "react";
import Link from "next/link";
import { Box, Text, Flex, Link as ChakraLink } from "@chakra-ui/react";

interface IProps {
  email: string;
  name: string;
  role: string;
  userId: string;
}

export function UserCard({ name, email, role, userId }: IProps) {
  return (
    <Box p={4} boxShadow="lg" borderRadius="lg" bgColor="primary.50">
      <Text fontWeight={800} fontSize="xl">
        {name}
      </Text>
      <Text>{email}</Text>
      <Flex mt={9} justifyContent="space-between" alignItems="center">
        <Text>{role === "ADMIN" ? "Administrador" : "Miembro"}</Text>
        <Link href={`/admin/family/${userId}`}>
          <ChakraLink color="primary.400">Ver permisos</ChakraLink>
        </Link>
      </Flex>
    </Box>
  );
}
