import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import {
  IAddIncomeInitialValues,
  ISelectStartEndMonthProps,
} from "../interface";
import { monthStartEnd } from "../../types";

export function SelectStartEndMonth(props: ISelectStartEndMonthProps) {
  const startEndSelection = monthStartEnd.map((startEnd) => {
    return <Radio value={startEnd}>{startEnd}</Radio>;
  });

  return (
    <Field name="startEndMonth">
      {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
        return (
          <FormControl
            isInvalid={
              props.formProps.errors.startEndMonth !== undefined &&
              props.formProps.touched.startEndMonth
            }
          >
            <FormLabel htmlFor="startEndMonth">Inicio o Fin de Mes</FormLabel>
            <RadioGroup>
              <Stack direction="column" spacing={2}>
                {startEndSelection}
              </Stack>
            </RadioGroup>
            <FormErrorMessage>
              {props.formProps.errors.startEndMonth}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
