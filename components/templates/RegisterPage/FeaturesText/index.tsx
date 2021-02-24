import {
  Box,
  Heading,
  useBreakpointValue,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

interface IProps {}

export default function FeaturesText(props: IProps) {
  const showText = useBreakpointValue<boolean>({ sm: false, md: true });
  return (
    <Box>
      <Heading textAlign="center" fontSize="4xl" pb={6} pt={10}>
        Register with Famfinance
      </Heading>
      {showText && (
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <List>
            <ListItem>
              <Text>
                <ListIcon as={MdCheckCircle} color="green.300" />
                Track your spending habits
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <ListIcon as={MdCheckCircle} color="green.300" />
                Organize your family finances to develop an action plan
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <ListIcon as={MdCheckCircle} color="green.300" />
                Save money
              </Text>
            </ListItem>
          </List>
        </Flex>
      )}
    </Box>
  );
}
