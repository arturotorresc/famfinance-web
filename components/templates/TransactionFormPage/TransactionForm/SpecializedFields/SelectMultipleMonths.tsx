import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import {
  ITransactionInitialValues,
  ISelectMultipleMonthsProps,
} from "../interface";
import { months } from "../../types";

export function SelectMultipleMonths(props: ISelectMultipleMonthsProps) {
  const monthSelection = months.map((month) => {
    return (
      <label key={month}>
        <Field type="checkbox" value={month} name="months" />
        {month}
      </label>
    );
  });

  return (
    <Field name="months">
      {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
        return (
          <FormControl
            isInvalid={
              props.formProps.errors.months !== undefined &&
              props.formProps.touched.months
            }
          >
            <FormLabel htmlFor="months">Meses</FormLabel>
            <CheckboxGroup>
              <Stack direction="column" spacing={2}>
                {monthSelection}
              </Stack>
            </CheckboxGroup>
            <FormErrorMessage>{props.formProps.errors.months}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
