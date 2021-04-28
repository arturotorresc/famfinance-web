import React, { ChangeEvent } from "react";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { ITransactionInitialValues, ISelectFrequencyTypeProps } from "./interface";
import { FrequencyType } from "../types";

export function SelectFrequencyType(props: ISelectFrequencyTypeProps) {
  return (
    <Stack spacing={3}>
      <Field name="frequencyType">
        {({ field, form }: FieldProps<any, ITransactionInitialValues>) => {
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
                <option value={FrequencyType.OneTime}>{FrequencyType.OneTime}</option>
                <option value={FrequencyType.SameDayRepeatMonths}>
                  {FrequencyType.SameDayRepeatMonths}
                </option>
                <option value={FrequencyType.SameDaySelectedMonths}>
                  {FrequencyType.SameDaySelectedMonths}
                </option>
                <option value={FrequencyType.SameWeekDayRepeatForWeeks}>
                  {FrequencyType.SameWeekDayRepeatForWeeks}
                </option>
                <option value={FrequencyType.StartEndDayRepeatMonths}>
                  {FrequencyType.StartEndDayRepeatMonths}
                </option>
                <option value={FrequencyType.StartEndDaySelectedMonths}>
                  {FrequencyType.StartEndDaySelectedMonths}
                </option>
              </Field>
            </FormControl>
          );
        }}
      </Field>
    </Stack>
  );
}
