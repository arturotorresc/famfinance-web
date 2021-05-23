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
    title: Yup.string().required("Campo requerido"),
    deadline: Yup.date().required("Campo requerido"),
    description: Yup.string().required("Campo requerido"),
    qty: Yup.number().required("Campo requerido")
  });
  
  export interface IValues {
    title: string;
    deadline: Date;
    description: string;
    qty: number;
  }
  
  interface IProps {
    onSubmit: (values: IValues, actions: FormikHelpers<IValues>) => void;
    initialValues: IValues;
  }
  
  export default function UpdateForm({ initialValues, onSubmit }: IProps) {
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
                <Field name="title">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.title !== undefined && form.touched.title
                        }
                      >
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input {...field} id="title" placeholder="Title" />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
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
                        <FormLabel htmlFor="deadline">Deadline</FormLabel>
                        <Input {...field} id="deadline" placeholder="Deadline" />
                        <FormErrorMessage>{form.errors.deadline}</FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="description">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.description !== undefined &&
                          form.touched.description
                        }
                      >
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Input
                          {...field}
                          id="description"
                          placeholder="Description"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Field name="qty">
                  {({ field, form }: FieldProps<any, IValues>) => {
                    return (
                      <FormControl
                        isInvalid={
                          form.errors.qty !== undefined &&
                          form.touched.qty
                        }
                      >
                        <FormLabel htmlFor="qty">
                          Ammount
                        </FormLabel>
                        <Input
                          {...field}
                          id="qty"
                          placeholder="Amount"
                        />
                        <FormErrorMessage>
                          {form.errors.qty}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                </Field>
                <Button
                  isLoading={formProps.isSubmitting}
                  loadingText="Updating goal..."
                  type="submit"
                >
                  Update Goal
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    );
  }
  