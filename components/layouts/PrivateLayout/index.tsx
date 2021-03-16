import { Box } from "@chakra-ui/react";

interface IProps {
  children: React.ReactNode;
}

export default function PrivateLayout(props: IProps) {
  return <Box>{props.children}</Box>;
}
