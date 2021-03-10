import {
    Stack,
    FormControl,
    Input,
    FormLabel,
    Button,
    FormErrorMessage,
    Container,
    Heading,
    Divider,
    Box
} from "@chakra-ui/react";
import { Formik, FormikHelpers, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
});

export interface IValues {
    email: string;
    password: string;
}

interface IProps {
    onSubmit: (values: IValues, actions: FormikHelpers<IValues>) => void;
    initialValues: IValues;
}

export default function LoginForm({ initialValues, onSubmit }: IProps) {
    return (
        <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {(formProps) => {
                return (
                    <Container padding="50px" border="1px" borderRadius="30px" >
                        <Heading as="h2" textAlign="center">Inicia Sesión</Heading>
                        <Divider margin="20px 0px" />
                        <Form>
                            <Stack spacing={3}>
                                <Field name="email">
                                    {({ field, form }: FieldProps<any, IValues>) => {
                                        return (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.email !== undefined && form.touched.email
                                                }
                                            >
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input {...field} id="email" placeholder="Ej. correo@dominio.com" />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        );
                                    }}
                                </Field>
                                <Field name="password">
                                    {({ field, form }: FieldProps<any, IValues>) => {
                                        return (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.password !== undefined &&
                                                    form.touched.password
                                                }
                                            >
                                                <FormLabel htmlFor="password">Contraseña</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="password"
                                                    placeholder="Contraseña"
                                                    type="password"
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
                                        );
                                    }}
                                </Field>
                                <Button
                                    isLoading={formProps.isSubmitting}
                                    loadingText="Verificando credenciales..."
                                    type="submit"
                                >
                                    Iniciar Sesión
                                </Button>
                            </Stack>
                        </Form>
                    </Container>
                );
            }}
        </Formik>
    );
}

/*
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
*/