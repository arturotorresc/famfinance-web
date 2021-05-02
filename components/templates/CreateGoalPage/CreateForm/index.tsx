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
  title: Yup.string().required(),
  description: Yup.string().required(),
  qty: Yup.number().required(),
  deadline: Yup.string().required()
});

export interface IValues {
  title: string;
  description: string;
  qty: number;
  deadline: string;
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
          <Container padding="50px" border="1px" borderRadius="30px">
            <Heading as="h2" textAlign="center">Agrega una Nueva Meta</Heading>
            <Divider margin="20px 0px"/>
            <Form>
              <Stack spacing={3}>
                <Field name="title">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.title !== undefined && form.touched.title
                        }
                      >
                        <FormLabel htmlFor="title">Título</FormLabel>
                        <Input {...field} id="title" placeholder="Título" />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="description">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.description !== undefined && form.touched.description
                        }
                      >
                        <FormLabel htmlFor="description">Descripción</FormLabel>
                        <Input {...field} id="description" placeholder="Descripción" />
                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="qty">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.qty !== undefined && form.touched.qty
                        }
                      >
                        <FormLabel htmlFor="qty">Cantidad</FormLabel>
                        <Input {...field} id="qty" />
                        <FormErrorMessage>{form.errors.qty}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="deadline">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.deadline !== undefined && form.touched.deadline
                        }
                      >
                        <FormLabel htmlFor="deadline">Fecha límite</FormLabel>
                        <Input {...field} id="deadline" />
                        <FormErrorMessage>{form.errors.deadline}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Button
                  isLoading={formProps.isSubmitting}
                  loadingText="Agregando meta..."
                  type="submit"
                >
                  Guardar
                </Button>
              </Stack>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}
