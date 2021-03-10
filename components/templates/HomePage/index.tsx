import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import Head from "next/head";
import { Box, Heading, Flex, Center, Container, Button, Image, useToast } from "@chakra-ui/react";
import LoginForm, { IValues } from "./LoginForm";

export default function HomePage() {
    const mutation = useMutation((userData: IValues) =>
        fetcher.post("/api/login", userData)
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
                <Center flex="8" bg="blue">
                    <Image src="https://st2.depositphotos.com/3591429/12544/i/950/depositphotos_125444456-stock-photo-person-writing-financial-budget.jpg" />
                </Center>
                <Center flex="7">
                    <Container>
                        <LoginForm
                            initialValues={{
                                email: "",
                                password: ""
                            }}
                            onSubmit={(vals, actions) => {
                                mutation.mutate(
                                    {
                                        email: vals.email,
                                        password: vals.password
                                    },
                                    {
                                        onSuccess: (res) => {
                                            toast({
                                                title: "Inicio de sesión exitoso!",
                                                description:
                                                    "Has iniciado sesión a tu cuenta exitosamente en Famfinance, " +
                                                    res.data.user.name,
                                                status: "success",
                                            });
                                            actions.setSubmitting(false);
                                        },
                                        onError: (error) => {
                                            toast({
                                                title: "Oops!",
                                                description: "Ha ocurrido un error! Por favor, intente de nuevo!",
                                                status: "error",
                                            });
                                            actions.setSubmitting(false);
                                        },
                                    }
                                );
                            }}
                        />
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
