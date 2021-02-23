import Head from "next/head";
import { Box, Heading, Flex, Center, FormControl, FormLabel, Input, Container, Button, Image, Divider } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box>
      <Head>
        <title>Bienvenido a FamFinance!</title>
      </Head>
      <Heading fontSize="5xl" textAlign="center" pt={20}>
        Bienvenido a FamFinance!
      </Heading>
      <Flex padding="45px 0px">
        <Center flex="8" bg="blue">
          <Image src="https://st2.depositphotos.com/3591429/12544/i/950/depositphotos_125444456-stock-photo-person-writing-financial-budget.jpg" />
        </Center>
        <Center flex="7">
          <Container>
            <Container padding="50px" border="1px" borderRadius="30px" >
              <Heading as="h2" textAlign="center">Inicia Sesión</Heading>
              <Divider margin="20px 0px"/>
              <FormControl padding="10px 0px">
                <FormLabel>
                  Correo Electrónico
                </FormLabel>
                <Input placeholder="Ej. correo@dominio.com"/>
              </FormControl>
              <FormControl padding="10px 0px">
                <FormLabel>
                  Contraseña
                </FormLabel>
                <Input type="password"/>
              </FormControl>
              <Box padding="10px 0px" textAlign="right">
                <Button>Iniciar Sesión</Button>
              </Box>
            </Container>
            <Center flexDirection="column">
              <Button padding="10px 0px 0px 0px" variant="link">Registrate</Button>
              <Button padding="10px 0px 0px 0px" variant="link">Únete a tu familia</Button>
            </Center>
          </Container>
        </Center>
      </Flex>
    </Box>
  );
}
