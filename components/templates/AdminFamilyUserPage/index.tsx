import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text, SimpleGrid, useToast } from "@chakra-ui/react";
import fetcher from "../../../fetchers/fetcher";
import { useQuery, useMutation } from "react-query";
import { PermissionCard } from "./PermissionCard";

export function AdminFamilyUserPageTemplate() {
  const router = useRouter();
  const { userId } = router.query;
  const toast = useToast();
  const { data: userData, isLoading: isLoadingUser } = useQuery(
    ["/user", userId],
    () => fetcher.get(`/users/${userId}`).then((res) => res.data)
  );
  const { mutate: mutateGivePermission } = useMutation((data: any) =>
    fetcher.put("/policy/give-permission", data)
  );
  const { mutate: mutateRevokePermission } = useMutation((data: any) =>
    fetcher.put("/policy/revoke-permission", data)
  );
  const handleGivePermission = useCallback((data: any) => {
    return mutateGivePermission(data, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Permiso dado!",
          description: "Has dado el permiso con éxito",
        });
      },
      onError: () => {
        toast({
          status: "error",
          title: "No eres admin de tu familia!",
          description: "Solo los admins pueden dar permisos!",
        });
      },
    });
  }, []);
  const handleRevokePermission = useCallback((data: any) => {
    return mutateRevokePermission(data, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Permiso removido!",
          description: "Has removido el permiso con éxito",
        });
      },
      onError: () => {
        toast({
          status: "error",
          title: "No eres admin de tu familia!",
          description: "Solo los admins pueden quitar permisos!",
        });
      },
    });
  }, []);

  const {
    data: availablePolicies,
    isLoading: isLoadingPolicies,
  } = useQuery("/policies", () =>
    fetcher.get("/policies").then((res) => res.data)
  );

  if (isLoadingUser || isLoadingPolicies) {
    return (
      <Box>
        <Text>Loading data...</Text>
      </Box>
    );
  }

  if (!userData || !userData.user) {
    return (
      <Box>
        <Heading>Información no encontrada :(</Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mt={10} textAlign="center">
        Permisos de {userData.user.name}
      </Heading>
      <Text textAlign="center">{userData.user.email}</Text>
      <SimpleGrid columns={4} spacing={3} mt={6} mx={5}>
        {availablePolicies.permissions.map((policy: any) => {
          const hasPermission =
            userData.user.role === "ADMIN" ||
            userData.policy.permissions.some((p: any) => p === policy);
          return (
            <PermissionCard
              managePermission={() => {
                if (hasPermission) {
                  handleRevokePermission({
                    memberId: userId,
                    permission: policy,
                  });
                } else {
                  handleGivePermission({
                    memberId: userId,
                    permission: policy,
                  });
                }
              }}
              hasPermission={hasPermission}
              permissionName={policy}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
