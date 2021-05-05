import React from "react";
import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { ITransactionInitialValues, IBasicFormFieldsProps } from "./interface";
import { TransactionCategoryEnum } from "../types";
import { translateCategory } from "./helpers";

export function BasicFormFields(props: IBasicFormFieldsProps) {
  return (
    <Stack spacing={3}>
      <Field name="title">
        {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
          return (
            <FormControl
              isInvalid={form.errors.title !== undefined && form.touched.title}
            >
              <FormLabel htmlFor="title">Título</FormLabel>
              <Input {...field} id="title" />
              <FormErrorMessage>{form.errors.title}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
      <Field name="quantity">
        {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
          return (
            <FormControl
              isInvalid={
                form.errors.quantity !== undefined && form.touched.quantity
              }
            >
              <FormLabel htmlFor="quantity">Cantidad</FormLabel>
              <Input {...field} id="quantity" type="number" />
              <FormErrorMessage>{form.errors.quantity}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
      <Field name="category">
        {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
          return (
            <FormControl
              isInvalid={
                form.errors.category !== undefined && form.touched.category
              }
            >
              <FormLabel htmlFor="category">Categoría</FormLabel>
              <Select {...field} id="category">
                {Object.keys(TransactionCategoryEnum).map((category) => {
                  return (
                    <option value={category}>
                      {translateCategory(category as TransactionCategoryEnum)}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>{form.errors.category}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
      <Field name="startDate">
        {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
          return (
            <FormControl
              isInvalid={
                form.errors.startDate !== undefined &&
                form.touched.startDate !== undefined
              }
            >
              <FormLabel htmlFor="startDate">Fecha de Inicio</FormLabel>
              <Input {...field} id="startDate" placeholder="dd-MM-aaaa" />
              <FormErrorMessage>{form.errors.startDate}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
      <Field name="endDate">
        {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
          return (
            <FormControl
              isInvalid={
                form.errors.endDate !== undefined &&
                form.touched.endDate !== undefined
              }
            >
              <FormLabel htmlFor="endDate">Fecha de Terminación</FormLabel>
              <Input {...field} id="endDate" placeholder="dd-MM-aaaa" />
              <FormErrorMessage>{form.errors.startDate}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </Stack>
  );
}
