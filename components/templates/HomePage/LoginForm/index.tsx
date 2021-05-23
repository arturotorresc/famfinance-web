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
} from "@chakra-ui/react";
import { Formik, FormikHelpers, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string()
    .matches(
      /^([a-zA-Z0-9.-_]+)@([a-zA-Z0-9.-_]+).([a-zA-Z]{2,5})$/,
      "Debe introducir un correo electrónico válido"
    )
    .required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
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
          <Container padding="50px" border="1px" borderRadius="30px">
            <Heading as="h2" textAlign="center">
              Inicia Sesión
            </Heading>
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
                        <Input
                          {...field}
                          id="email"
                          placeholder="Ej. correo@dominio.com"
                        />
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
