import {
  Stack,
  FormControl,
  Input,
  FormLabel,
  Button,
  FormErrorMessage,
  Container,
  Heading,
  Divider
} from "@chakra-ui/react";
import { Formik, FormikHelpers, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  email: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Las contraseñas no coinciden!"
  ),
  familyId: Yup.string().required("Campo requerido"),
});

export interface IValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  familyId: string;
}

interface IProps {
  onSubmit: (values: IValues, actions: FormikHelpers<IValues>) => void;
  initialValues: IValues;
}

export default function RegisterForm({ initialValues, onSubmit }: IProps) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formProps) => {
        return (
          <Container padding="50px" border="1px" borderRadius="30px">
            <Heading as="h2" textAlign="center">Regístrate con tu Familia</Heading>
            <Divider margin="20px 0px"/>
            <Form>
              <Stack spacing={3}>
                <Field name="name">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.name !== undefined && form.touched.name
                        }
                      >
                        <FormLabel htmlFor="name">Nombre</FormLabel>
                        <Input {...field} id="name" placeholder="Nombre" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
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
                <Field name="confirmPassword">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword !== undefined &&
                          form.touched.confirmPassword
                        }
                      >
                        <FormLabel htmlFor="confirmPassword">
                          Confirma contraseña
                        </FormLabel>
                        <Input
                          {...field}
                          id="confirmPassword"
                          placeholder="Confirma Contraseña"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="familyId">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.familyId !== undefined && form.touched.familyId
                        }
                      >
                        <FormLabel htmlFor="familyId">ID de Familia</FormLabel>
                        <Input {...field} id="familyId" placeholder="ID de Familia" />
                        <FormErrorMessage>{form.errors.familyId}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Button
                  isLoading={formProps.isSubmitting}
                  loadingText="Creando usuario..."
                  type="submit"
                >
                  Crear cuenta
                </Button>
              </Stack>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}
