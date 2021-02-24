import { Box } from "@chakra-ui/react";

interface IProps {
  children: React.ReactNode;
}

export default function PublicLayout(props: IProps) {
  return <Box>{props.children}</Box>;
}
