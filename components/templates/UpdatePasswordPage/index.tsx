import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, Box, useToast, Heading } from "@chakra-ui/react";
import UpdateForm from "./UpdateForm";

interface IValues{
    oldPassword: string;
    newPassword: string;
}

export default function UpdatePassword() {
  const mutation = useMutation((passwordData: IValues) =>
    fetcher.put("/password", passwordData)
  );
  const toast = useToast();

  return (
    <Flex flexDir="column">
      <Head>
        <title>Updtae | Password</title>
      </Head>

      <Box w={["100%"]} px={1}>
        <Heading
          textAlign="center"
          fontSize={["4xl", null, "6xl"]}
          pb={6}
          pt={10}
        >
          Actualizar Contraseña
        </Heading>
      </Box>
      <Flex
        w={["100%", null, "80%", "550px"]}
        mt={3}
        mx="auto"
        flexDir="column"
        p={[3]}
        mb={6}
        boxShadow="lg"
      >
        <UpdateForm
          initialValues={{
            oldPassword : "",
            newPassword : ""
          }}
          onSubmit={(vals, actions) => {
            mutation.mutate(
              {
                oldPassword: vals.oldPassword,
                newPassword: vals.newPassword
              },
              {
                onSuccess: (res) => {
                  toast({
                    title: "Contraseña Actualizada",
                    description:
                      "La Contraseña ha sido actualizada con exito",
                    status: "success",
                  });
                  actions.setSubmitting(false);
                },
                onError: (error) => {
                  toast({
                    title: "Oops!",
                    description: "Un Error ocurrio, intenta de nuevo por favor",
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
  );
}
