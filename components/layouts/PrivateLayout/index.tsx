import React, { Component } from "react";
import NextLink from "next/link";
import { Box, LinkBox, Link, Flex } from "@chakra-ui/react";
import NavLinkToPage from "./NavLinkToPage";
import AccountMenu from "./AccountMenu";

interface IProps {
  children: React.ReactNode;
}

class NavBar extends Component {
  render() {
    return (
      <Flex
        height="50px"
        bg="primary.500"
        fontFamily="sans-serif"
        align="center"
      >
        <LinkBox color="white" variant="link" padding="0px 40px">
          <NextLink href="/dashboard">
            <Link fontWeight={700} fontSize="xl">
              FamFinance
            </Link>
          </NextLink>
        </LinkBox>
        <NavLinkToPage href="/dashboard" title="Dashboard" />
        <NavLinkToPage href="/incomes" title="Ingresos" />
        <NavLinkToPage href="/expenses" title="Gastos" />
        <NavLinkToPage href="/goals" title="Metas" />
        <NavLinkToPage href="/savings-plan" title="Plan de Ahorros" />
        <AccountMenu />
      </Flex>
    );
  }
}

export default function PrivateLayout(props: IProps) {
  return (
    <Box>
      <NavBar />
      <Box>{props.children}</Box>
    </Box>
  );
}
