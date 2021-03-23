import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  LinkOverlay,
  Box,
} from "@chakra-ui/react";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export default function AccountMenu() {
  const { user } = useCurrentUser();
  const userName = user ? user.name : "Cuenta";

  return (
    <Box margin="0px 20px 0px auto">
      <Menu>
        <MenuButton as={LinkOverlay} color="#dce7f7">
          {userName}
        </MenuButton>
        <MenuList>
          <MenuItem>Mi Cuenta</MenuItem>
          <MenuItem>Administración de Miembros</MenuItem>
          <MenuItem>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
