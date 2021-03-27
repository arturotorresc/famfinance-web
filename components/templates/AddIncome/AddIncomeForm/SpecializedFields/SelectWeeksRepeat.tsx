import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { IAddIncomeInitialValues, ISelectWeeksRepeatProps } from "../interface";

export function SelectWeeksRepeat(props: ISelectWeeksRepeatProps) {
  return (
    <Field name="weeksRepeat">
      {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
        return (
          <FormControl
            isInvalid={
              form.errors.weeksRepeat !== undefined && form.touched.weeksRepeat
            }
          >
            <FormLabel htmlFor="weeksRepeat">Frecuencia en Semanas</FormLabel>
            <Input {...field} id="weeksRepeat" type="number" />
            <FormErrorMessage>{form.errors.weeksRepeat}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
