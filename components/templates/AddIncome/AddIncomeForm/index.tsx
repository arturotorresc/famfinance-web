import React, { useState, ChangeEvent } from "react";
import { Stack, Button, Box } from "@chakra-ui/react";
import { BasicFormFields } from "./BasicFormFields";
import { SelectIncomeType } from "./SelectIncomeType";
import { Formik, Form } from "formik";
import { IProps } from "./interface";
import { schema } from "./schema";
import { IncomeType } from "../types";
import { SelectMultipleMonths } from "./SpecializedFields/SelectMultipleMonths";
import { SelectDay } from "./SpecializedFields/SelectDay";
import { SelectMonthsRepeat } from "./SpecializedFields/SelectMonthsRepeat";
import { SelectWeekDay } from "./SpecializedFields/SelectWeekDay";
import { SelectWeeksRepeat } from "./SpecializedFields/SelectWeeksRepeat";
import { SelectStartEndMonth } from "./SpecializedFields/SelectStartEndMonth";

export function AddIncomeForm(props: IProps) {
  const [formType, setFormType] = useState(IncomeType.OneTime);

  const stringToIncomeType = (s: string) => {
    switch (s) {
      case "Única ocasión":
        return IncomeType.OneTime;
      case "Recurrente: Mismo día de la semana cada N semanas":
        return IncomeType.SameWeekDayRepeatForWeeks;
      case "Recurrente: Inicio o fin de mes cada N meses":
        return IncomeType.StartEndDayRepeatMonths;
      case "Recurrente: Inicio o fin de mes en meses selectos":
        return IncomeType.StartEndDaySelectedMonths;
      case "Recurrente: Mismo día del mes, cada N meses":
        return IncomeType.SameDayRepeatMonths;
      case "Recurrente: Mismo día del mes en meses selectos":
        return IncomeType.SameDaySelectedMonths;
      default:
        return IncomeType.OneTime;
    }
  };

  const onChangeFormType = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormType(stringToIncomeType(e.target.value));
  };

  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={schema}
    >
      {(formProps) => {
        let extraFields = function (a: IncomeType) {
          switch (a) {
            case IncomeType.OneTime:
              return <Stack spacing={3}></Stack>;
            case IncomeType.SameDayRepeatMonths:
              return (
                <Stack spacing={3}>
                  <SelectDay formProps={formProps} />
                  <SelectMonthsRepeat formProps={formProps} />
                </Stack>
              );
            case IncomeType.SameDaySelectedMonths:
              return (
                <Stack spacing={3}>
                  <SelectDay formProps={formProps} />
                  <SelectMultipleMonths formProps={formProps} />
                </Stack>
              );
            case IncomeType.SameWeekDayRepeatForWeeks:
              return (
                <Stack spacing={3}>
                  <SelectWeekDay formProps={formProps} />
                  <SelectWeeksRepeat formProps={formProps} />
                </Stack>
              );
            case IncomeType.StartEndDayRepeatMonths:
              return (
                <Stack spacing={3}>
                  <SelectStartEndMonth formProps={formProps} />
                  <SelectMonthsRepeat formProps={formProps} />
                </Stack>
              );
            case IncomeType.StartEndDaySelectedMonths:
              return (
                <Stack spacing={3}>
                  <SelectStartEndMonth formProps={formProps} />
                  <SelectMultipleMonths formProps={formProps} />
                </Stack>
              );
          }
        };

        return (
          <Form>
            <Stack spacing={3}>
              <BasicFormFields formProps={formProps} />
              <SelectIncomeType
                formProps={formProps}
                onChangeFormType={onChangeFormType}
              />
              {extraFields(formType)}
              <Button isLoading={formProps.isSubmitting} type="submit">
                Guardar
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
