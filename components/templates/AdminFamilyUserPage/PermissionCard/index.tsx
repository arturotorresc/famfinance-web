import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";

interface IProps {
  permissionName: string;
  hasPermission: boolean;
  managePermission: () => void;
}

export function PermissionCard({
  permissionName,
  hasPermission,
  managePermission,
}: IProps) {
  return (
    <Flex
      border={hasPermission ? "2px green solid" : "2px gray solid"}
      boxShadow="lg"
      p={4}
      borderRadius="xl"
      flexDirection="column"
    >
      <Text fontSize="lg" fontWeight="700">
        {permissionName}
      </Text>
      <Button
        onClick={managePermission}
        colorScheme="primary"
        variant="ghost"
        mt={8}
      >
        {hasPermission ? "Quitar permiso" : "Dar permiso"}
      </Button>
    </Flex>
  );
}
