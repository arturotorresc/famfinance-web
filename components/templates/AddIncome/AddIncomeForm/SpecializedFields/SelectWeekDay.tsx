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
import { IAddIncomeInitialValues, ISelectWeekDayProps } from "../interface";
import { daysOfTheWeek } from "../../types";

export function SelectWeekDay(props: ISelectWeekDayProps) {
  const weekDaySelection = daysOfTheWeek.map((weekDay) => {
    return (
      <label key={weekDay}>
        <Field type="radio" value={weekDay} name="weekDay" />
        {weekDay}
      </label>
    );
  });

  return (
    <Field name="weekDay">
      {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
        return (
          <FormControl
            isInvalid={
              props.formProps.errors.weekDay !== undefined &&
              props.formProps.touched.weekDay
            }
          >
            <FormLabel htmlFor="weekDay">Inicio o Fin de Mes</FormLabel>
            <RadioGroup>
              <Stack direction="column" spacing={2}>
                {weekDaySelection}
              </Stack>
            </RadioGroup>
            <FormErrorMessage>
              {props.formProps.errors.weekDay}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
