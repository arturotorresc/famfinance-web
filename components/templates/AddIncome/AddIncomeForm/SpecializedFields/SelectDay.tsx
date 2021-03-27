import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { IAddIncomeInitialValues, ISelectDayProps } from "../interface";

export function SelectDay(props: ISelectDayProps) {
  return (
    <Field name="day">
      {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
        return (
          <FormControl
            isInvalid={form.errors.day !== undefined && form.touched.day}
          >
            <FormLabel htmlFor="day">Día del Mes</FormLabel>
            <Input {...field} id="day" type="number" />
            <FormErrorMessage>{form.errors.day}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
