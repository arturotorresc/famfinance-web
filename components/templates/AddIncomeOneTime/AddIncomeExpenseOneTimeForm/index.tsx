import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack,
  RadioGroup,
  Radio,
  Button,
} from "@chakra-ui/react";
import isDate from "date-fns/isDate";
import parseDate from "date-fns/parse";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  title: Yup.string().min(2).required(),
  quantity: Yup.number().min(0).required(),
  startDate: Yup.date()
    .transform((val: any, originalVal: string | Date) => {
      if (originalVal instanceof Date) {
        return originalVal;
      }
      const parsedDate = isDate(originalVal)
        ? originalVal
        : parseDate(originalVal, "dd-MM-yyyy", new Date());
      console.log(parsedDate);
      return parsedDate;
    })
    .required("Please enter a date in dd-MM-yyyy format"),
  movementType: Yup.string().oneOf(["income", "expense"]).required(),
  category: Yup.string().required(),
});

interface IInitialValues {
  title: string;
  quantity: number;
  startDate: string;
  movementType: string;
  category: string;
}

interface IProps {
  initialValues: IInitialValues;
  onSubmit: (
    vals: IInitialValues,
    actions: FormikHelpers<IInitialValues>
  ) => void;
}

export function AddIncomeExpenseOneTimeForm(props: IProps) {
  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={schema}
    >
      {(formProps) => {
        return (
          <Form>
            <Stack spacing={3}>
              <Field name="title">
                {({ field, form }: FieldProps<any, IInitialValues>) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.title !== undefined && form.touched.title
                      }
                    >
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Input {...field} id="title" />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name="quantity">
                {({ field, form }: FieldProps<any, IInitialValues>) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.quantity !== undefined &&
                        form.touched.quantity
                      }
                    >
                      <FormLabel htmlFor="quantity">Amount</FormLabel>
                      <Input {...field} id="quantity" type="number" />
                      <FormErrorMessage>
                        {form.errors.quantity}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name="category">
                {({ field, form }: FieldProps<any, IInitialValues>) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.category !== undefined &&
                        form.touched.category
                      }
                    >
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Input {...field} id="category" />
                      <FormErrorMessage>
                        {form.errors.category}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name="startDate">
                {({ field, form }: FieldProps<any, IInitialValues>) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.startDate !== undefined &&
                        form.touched.startDate !== undefined
                      }
                    >
                      <FormLabel htmlFor="startDate">Date</FormLabel>
                      <Input
                        {...field}
                        id="startDate"
                        placeholder="dd-MM-yyyy"
                      />
                      <FormErrorMessage>
                        {form.errors.startDate}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <FormControl
                isInvalid={
                  formProps.errors.movementType !== undefined &&
                  formProps.touched.movementType
                }
              >
                <RadioGroup>
                  <Stack direction="row" spacing={2}>
                    <Field name="movementType">
                      {({ field, form }: FieldProps<any, IInitialValues>) => {
                        return (
                          <Radio {...field} value="expense">
                            Expense
                          </Radio>
                        );
                      }}
                    </Field>
                    <Field name="movementType">
                      {({ field, form }: FieldProps<any, IInitialValues>) => {
                        return (
                          <Radio {...field} value="income">
                            Income
                          </Radio>
                        );
                      }}
                    </Field>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>
                  {formProps.errors.movementType}
                </FormErrorMessage>
              </FormControl>
              );
              <Button isLoading={formProps.isSubmitting} type="submit">
                Save
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
