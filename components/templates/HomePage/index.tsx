import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Heading,
  Flex,
  Center,
  Container,
  Button,
  useToast,
} from "@chakra-ui/react";
import LoginForm, { IValues } from "./LoginForm";

export default function HomePage() {
  const mutation = useMutation((userData: IValues) =>
    fetcher.post("/login", userData)
  );
  const toast = useToast();
  return (
    <Box>
      <Head>
        <title>Bienvenido a FamFinance!</title>
      </Head>
      <Heading fontSize="5xl" textAlign="center" pt={20}>
        Bienvenido a FamFinance!
      </Heading>
      <Flex padding="45px 0px">
        <Center flex="8">
          <Image
            src="/images/famfinanceHomePage.jpg"
            alt="Hand writing in a paper"
            width={700}
            height={450}
          />
        </Center>
        <Center flex="7">
          <Container>
            <LoginForm
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(vals, actions) => {
                mutation.mutate(
                  {
                    email: vals.email,
                    password: vals.password,
                  },
                  {
                    onSuccess: (res) => {
                      console.log(res);
                      actions.setSubmitting(false);
                    },
                    onError: (error) => {
                      toast({
                        title: "Oops!",
                        description:
                          "Ha ocurrido un error! Por favor, intente de nuevo!",
                        status: "error",
                      });
                      actions.setSubmitting(false);
                    },
                  }
                );
              }}
            />
            <Center flexDirection="column">
              <Button padding="10px 0px 0px 0px" variant="link">
                Registrate
              </Button>
              <Button padding="10px 0px 0px 0px" variant="link">
                Únete a tu familia
              </Button>
            </Center>
          </Container>
        </Center>
      </Flex>
    </Box>
  );
}
