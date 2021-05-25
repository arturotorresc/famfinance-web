import { useMutation } from "react-query";
import { useRouter } from "next/router";
import fetcher from "../../../fetchers/fetcher";
import Head from "next/head";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import Image from "next/image";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Flex,
  Center,
  HStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, Form, Formik } from 'formik';

interface IValues{
  name: string
}

export default function ProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useCurrentUser();
  const [isEditingName, setIsEditingName] = useState(false);

  const handleEditName = () => {
    setIsEditingName(true);
  }

  const handleUpdatePassword = () => {
    router.push("/update-password");
  }

  const mutation = useMutation((userData: IValues) =>
    fetcher.put("/user", userData)
  );

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
                {isEditingName && 
                  (
                  
                    <Formik
                      initialValues={{ name: user?.name }}
                      onSubmit={(values, actions) => {
                        setTimeout(() => {
                          toast({
                            title: "Nombre actualizado",
                            description:
                              "El nombre ha sido actualizado con exito",
                            status: "success",
                          });
                          mutation.mutate({name: values.name!});
                          actions.setSubmitting(false);
                          location.reload();
                        }, 1000);
                      }}
                    >
                      <Form>
                        <HStack pt={6}>
                          <Field name="name">
                            {({ field }: any) => (
                              <Input {...field} type="text" placeholder="name" fontSize="3xl" width="30" />
                            )}
                          </Field>
                          <Button type="submit">Actualizar</Button>
                        </HStack>
                      </Form>
                    </Formik>
                  
                  )
                }
                {!isEditingName && 
                  (
                  <HStack pt={6}>
                    <Box fontSize="3xl" textAlign="left" >
                      {user?.name}
                    </Box>
                    <IconButton  aria-label="edit" icon ={<EditIcon/>} onClick = {handleEditName}/>
                  </HStack>
                  )
                }
              
              <HStack pt={6}>
                <Box fontSize="3xl" textAlign="left" >
                  {user?.role}
                </Box>
              </HStack>
              <HStack pt={6}>
                <Box fontSize="3xl" textAlign="left" color="primary.500">
                  {user?.email}
                </Box>
              </HStack>
              <HStack pt={6}>
                <Button fontSize="xl" type="submit" onClick={handleUpdatePassword}>Cambiar Contraseña</Button>
              </HStack>
            </Box>
        </Box>
      </Flex>
    </Box>
  );
}
