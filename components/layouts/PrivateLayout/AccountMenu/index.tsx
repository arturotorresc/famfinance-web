import React from "react";
import Link from "next/link";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Box,
} from "@chakra-ui/react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import fetcher from "../../../../fetchers/fetcher";

export default function AccountMenu() {
  const { user } = useCurrentUser();
  const userName = user ? user.name : "Cuenta";

  const router = useRouter();

  const mutation = useMutation(() => fetcher.post("/logout"));

  const handleLogOut = () => {
    mutation.mutate();
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <Box margin="0px 20px 0px auto">
      <Menu>
        <MenuButton as={Button}>{userName}</MenuButton>
        <MenuList>
          <MenuItem>Mi Cuenta</MenuItem>
          <MenuItem>
            <Link href="/admin/family">
              <a>Administración de Miembros</a>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfile}>Mi Cuenta</MenuItem>
          <MenuItem onClick={handleLogOut}>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
