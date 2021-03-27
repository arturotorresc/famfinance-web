import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import {
  IAddIncomeInitialValues,
  ISelectMultipleMonthsProps,
} from "../interface";
import { months } from "../../types";

export function SelectMultipleMonths(props: ISelectMultipleMonthsProps) {
  const monthSelection = months.map((month) => {
    return <Checkbox value={month}>{month}</Checkbox>;
  });

  return (
    <Field name="incomeFrequency">
      {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
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
