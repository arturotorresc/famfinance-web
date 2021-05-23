import {
    Stack,
    FormControl,
    Input,
    FormLabel,
    Button,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import { Formik, FormikHelpers, Form, Field, FieldProps } from "formik";
  import * as Yup from "yup";
  
  const schema = Yup.object({
    oldPassword: Yup.string().required("Campo requerido"),
    newPassword: Yup.string().required("Campo requerido"),
  });
  
  export interface IValues {
    oldPassword: string;
    newPassword: string;
  }
  
  interface IProps {
    onSubmit: (values: IValues, actions: FormikHelpers<IValues>) => void;
    initialValues: IValues;
  }
  
  export default function CreateForm({ initialValues, onSubmit }: IProps) {
    return (
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(formProps) => {
          return (
            <Form>
              <Stack spacing={3}>
                <Field name="oldPassword">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.oldPassword !== undefined && form.touched.oldPassword
                        }
                      >
                        <FormLabel htmlFor="oldPassword">Antigua Contraseña</FormLabel>
                        <Input {...field} type="password" id="title" placeholder="Antigua Contraseña" />
                        <FormErrorMessage>{form.errors.oldPassword}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="newPassword">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                            form.errors.newPassword !== undefined && form.touched.newPassword
                        }
                      >
                        <FormLabel htmlFor="newPassword">Nueva Contraseña</FormLabel>
                        <Input
                          {...field}
                          id="newPassword"
                          type="password"
                          placeholder="Nueva Contraseña"
                        />
                        <FormErrorMessage>
                          {form.errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Button
                  isLoading={formProps.isSubmitting}
                  loadingText="Actualizando Sontraseña..."
                  type="submit"
                >
                  Actualizar Contraseña
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    );
  }
  