import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import {
  IAddIncomeInitialValues,
  ISelectMonthsRepeatProps,
} from "../interface";

export function SelectMonthsRepeat(props: ISelectMonthsRepeatProps) {
  return (
    <Field name="monthsRepeat">
      {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
        return (
          <FormControl
            isInvalid={
              form.errors.monthsRepeat !== undefined &&
              form.touched.monthsRepeat
            }
          >
            <FormLabel htmlFor="monthsRepeat">Frecuencia en Meses</FormLabel>
            <Input {...field} id="monthsRepeat" type="number" />
            <FormErrorMessage>{form.errors.monthsRepeat}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
