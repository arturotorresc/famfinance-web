import React from "react";
import NextLink from "next/link";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";

interface IProps {
  href: string;
  title: string;
}

export default function NavLinkToPage(props: IProps) {
  return (
    <LinkBox color="#dce7f7" variant="link" padding="20px">
      <NextLink href={props.href}>
        <LinkOverlay>{props.title}</LinkOverlay>
      </NextLink>
    </LinkBox>
  );
}
