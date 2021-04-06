import React from "react";
import { FormControl, FormLabel, Stack, Select } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { IAddIncomeInitialValues, ISelectIncomeTypeProps } from "./interface";
import { IncomeType } from "../types";

export function SelectIncomeType(props: ISelectIncomeTypeProps) {
  return (
    <Stack spacing={3}>
      <Field name="incomeFrequency">
        {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
          return (
            <FormControl>
              <FormLabel htmlFor="incomeFrequency">
                Frecuencia de Ingreso
              </FormLabel>
              <Select
                placeholder="Selecciona una opción"
                onChange={props.onChangeFormType}
              >
                <option value={IncomeType.OneTime}>{IncomeType.OneTime}</option>
                <option value={IncomeType.SameDayRepeatMonths}>
                  {IncomeType.SameDayRepeatMonths}
                </option>
                <option value={IncomeType.SameDaySelectedMonths}>
                  {IncomeType.SameDaySelectedMonths}
                </option>
                <option value={IncomeType.SameWeekDayRepeatForWeeks}>
                  {IncomeType.SameWeekDayRepeatForWeeks}
                </option>
                <option value={IncomeType.StartEndDayRepeatMonths}>
                  {IncomeType.StartEndDayRepeatMonths}
                </option>
                <option value={IncomeType.StartEndDaySelectedMonths}>
                  {IncomeType.StartEndDaySelectedMonths}
                </option>
              </Select>
            </FormControl>
          );
        }}
      </Field>
    </Stack>
  );
}
