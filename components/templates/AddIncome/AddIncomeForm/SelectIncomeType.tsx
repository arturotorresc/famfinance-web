import React, { ChangeEvent } from "react";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { IAddIncomeInitialValues, ISelectIncomeTypeProps } from "./interface";
import { IncomeType } from "../types";

export function SelectIncomeType(props: ISelectIncomeTypeProps) {
  return (
    <Stack spacing={3}>
      <Field name="frequencyType">
        {({ field, form }: FieldProps<any, IAddIncomeInitialValues>) => {
          return (
            <FormControl>
              <FormLabel htmlFor="frequencyType">
                Frecuencia de Ingreso
              </FormLabel>
              <Field
                as="select"
                name="frequencyType"
                placeholder="Selecciona una opción"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  props.onChangeFormType(e);
                  props.setFieldValue("frequencyType", e.target.value);
                }}
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
              </Field>
            </FormControl>
          );
        }}
      </Field>
    </Stack>
  );
}
