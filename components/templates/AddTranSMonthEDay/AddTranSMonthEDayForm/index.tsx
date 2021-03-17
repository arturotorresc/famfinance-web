import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { schema } from "./schema";
import { IInitialValues, IProps } from "./interface";

export function AddTranSMonthEDayForm(props: IProps) {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthSelection = months.map((month) => {
    return (
      <Field name="months">
        {({ field, form }: FieldProps<any, IInitialValues>) => {
          return (
            <Checkbox {...field} value={month}>
              {month}
            </Checkbox>
          );
        }}
      </Field>
    );
  });

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
                      <FormLabel htmlFor="title">Título</FormLabel>
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
                      <FormLabel htmlFor="quantity">Cantidad</FormLabel>
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
                      <FormLabel htmlFor="category">Categoría</FormLabel>
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
                      <FormLabel htmlFor="startDate">Fecha de Inicio</FormLabel>
                      <Input
                        {...field}
                        id="startDate"
                        placeholder="dd-MM-aaaa"
                      />
                      <FormErrorMessage>
                        {form.errors.startDate}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
              <Field name="endDate">
                {({ field, form }: FieldProps<any, IInitialValues>) => {
                  return (
                    <FormControl
                      isInvalid={
                        form.errors.endDate !== undefined &&
                        form.touched.endDate !== undefined
                      }
                    >
                      <FormLabel htmlFor="endDate">
                        Fecha de Terminación
                      </FormLabel>
                      <Input {...field} id="endDate" placeholder="dd-MM-aaaa" />
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
                            Gasto
                          </Radio>
                        );
                      }}
                    </Field>
                    <Field name="movementType">
                      {({ field, form }: FieldProps<any, IInitialValues>) => {
                        return (
                          <Radio {...field} value="income">
                            Ingreso
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
              <FormControl
                isInvalid={
                  formProps.errors.dayType !== undefined &&
                  formProps.touched.dayType
                }
              >
                <FormLabel htmlFor="dayType">Inicio o Fin de Mes</FormLabel>
                <RadioGroup>
                  <Stack direction="row" spacing={2}>
                    <Field name="dayType">
                      {({ field, form }: FieldProps<any, IInitialValues>) => {
                        return (
                          <Radio {...field} value="start">
                            Inicio
                          </Radio>
                        );
                      }}
                    </Field>
                    <Field name="dayType">
                      {({ field, form }: FieldProps<any, IInitialValues>) => {
                        return (
                          <Radio {...field} value="end">
                            Fin
                          </Radio>
                        );
                      }}
                    </Field>
                  </Stack>
                </RadioGroup>
                <FormErrorMessage>{formProps.errors.dayType}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formProps.errors.months !== undefined &&
                  formProps.touched.months
                }
              >
                <FormLabel htmlFor="months">Meses</FormLabel>
                <CheckboxGroup>
                  <Stack direction="column" spacing={2}>
                    {monthSelection}
                  </Stack>
                </CheckboxGroup>
                <FormErrorMessage>{formProps.errors.months}</FormErrorMessage>
              </FormControl>
              <Button isLoading={formProps.isSubmitting} type="submit">
                Guardar
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
