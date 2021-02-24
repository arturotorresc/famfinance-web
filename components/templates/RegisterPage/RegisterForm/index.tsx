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
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

interface IValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    >
      {(formProps) => {
        return (
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
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} id="name" placeholder="Name" />
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
                      <Input {...field} id="email" placeholder="Email" />
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
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input {...field} id="password" placeholder="Password" />
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
                        Confirm password
                      </FormLabel>
                      <Input
                        {...field}
                        id="confirmPassword"
                        placeholder="Confirm Password"
                      />
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Button>Create account</Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
