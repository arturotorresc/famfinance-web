import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, useToast } from "@chakra-ui/react";
import RegisterForm, { IValues } from "./RegisterForm";

export default function Register() {
  const router = useRouter();
  const mutation = useMutation((userData: IValues) =>
    fetcher.post("/users", userData)
  );
  const toast = useToast();
  return (
    <div>
      <Head>
        <title>Registro | Famfinance</title>
      </Head>
      <Flex flexDir="column">
        <Flex
          w="550px"
          mt={30}
          mx="auto"
          flexDir="column"
          p={3}
          mb={6}
        >
          <RegisterForm
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={(vals, actions) => {
              mutation.mutate(
                {
                  name: vals.name,
                  email: vals.email,
                  password: vals.password,
                  confirmPassword: vals.confirmPassword
                },
                {
                  onSuccess: (res) => {
                    toast({
                      title: "Cuenta creada!",
                      description:
                        "Te has registrado exitosamente a Famfinance, " +
                        res.data.user.name,
                      status: "success",
                    });
                    router.push("/");
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
        </Flex>
      </Flex>
    </div>
  );
}