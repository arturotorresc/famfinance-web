import { useMutation } from "react-query";
import { useRouter } from "next/router";
import fetcher from "../../../fetchers/fetcher";
import Head from "next/head";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Link from "next/link";
import Image from "next/image";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Flex,
  Center,
  HStack,
  Heading,
  Container,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function ProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useCurrentUser();
  return (
    <Box>
      <Head>
        <title>Perfil</title>
      </Head>
      <Flex padding="45px 0px">
        <Center flex="8">
          <Image
            src="/images/profilePicture.png"
            alt="Empty Profile Picture"
            width={400}
            height={400}
          />
        </Center>
        <Box flex="8" alignItems="left">
            
            <Box flexDirection="column" alignItems="left">
              <HStack pt={6}>
                <Heading fontSize="3xl" textAlign="left" >
                  {user?.name}
                </Heading>
                <IconButton  aria-label="edit" icon ={<EditIcon/>} />
              </HStack>
              <HStack pt={6}>
                <Heading fontSize="3xl" textAlign="left" >
                  {user?.role}
                </Heading>
              </HStack>
              <HStack pt={6}>
                <Heading fontSize="3xl" textAlign="left" color="primary.500">
                  {user?.email}
                </Heading>
              </HStack>
              <HStack pt={6}>
                <Heading fontSize="3xl" textAlign="left" >
                  Contraseña: ******* 
                </Heading>
                <IconButton  aria-label="edit" icon ={<EditIcon/>} />
              </HStack>
            </Box>
        </Box>
      </Flex>
    </Box>
  );
}
