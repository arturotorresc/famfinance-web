import React, { useState, ChangeEvent } from "react";
import { Stack, Button, Box } from "@chakra-ui/react";
import { BasicFormFields } from "./BasicFormFields";
import { SelectFrequencyType } from "./SelectFrequencyType";
import { Formik, Form } from "formik";
import { IProps } from "./interface";
import { schema } from "./schema";
import { FrequencyType } from "../types";
import { SelectMultipleMonths } from "./SpecializedFields/SelectMultipleMonths";
import { SelectDay } from "./SpecializedFields/SelectDay";
import { SelectMonthsRepeat } from "./SpecializedFields/SelectMonthsRepeat";
import { SelectWeekDay } from "./SpecializedFields/SelectWeekDay";
import { SelectWeeksRepeat } from "./SpecializedFields/SelectWeeksRepeat";
import { SelectStartEndMonth } from "./SpecializedFields/SelectStartEndMonth";

export function TransactionForm(props: IProps) {
  const stringToFrequencyType = (s: string) => {
    switch (s) {
      case "Única ocasión":
        return FrequencyType.OneTime;
      case "Recurrente: Mismo día de la semana cada N semanas":
        return FrequencyType.SameWeekDayRepeatForWeeks;
      case "Recurrente: Inicio o fin de mes cada N meses":
        return FrequencyType.StartEndDayRepeatMonths;
      case "Recurrente: Inicio o fin de mes en meses selectos":
        return FrequencyType.StartEndDaySelectedMonths;
      case "Recurrente: Mismo día del mes, cada N meses":
        return FrequencyType.SameDayRepeatMonths;
      case "Recurrente: Mismo día del mes en meses selectos":
        return FrequencyType.SameDaySelectedMonths;
      default:
        return FrequencyType.OneTime;
    }
  };

  const currentFormType = stringToFrequencyType(props.initialValues.frequencyType);
  const [formType, setFormType] = useState(currentFormType);
  const [isBeenChanged, setIsBeenChanged] = useState(false);

  const onChangeFormType = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsBeenChanged(true);
    setFormType(stringToFrequencyType(e.target.value));
  };

  return (
    <Formik
      onSubmit={props.onSubmit}
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={schema}
    >
      {(formProps) => {
        let extraFields = function (a: FrequencyType) {
          switch (a) {
            case FrequencyType.OneTime:
              return <Stack spacing={3}></Stack>;
            case FrequencyType.SameDayRepeatMonths:
              return (
                <Stack spacing={3}>
                  <SelectDay formProps={formProps} />
                  <SelectMonthsRepeat formProps={formProps} />
                </Stack>
              );
            case FrequencyType.SameDaySelectedMonths:
              return (
                <Stack spacing={3}>
                  <SelectDay formProps={formProps} />
                  <SelectMultipleMonths formProps={formProps} />
                </Stack>
              );
            case FrequencyType.SameWeekDayRepeatForWeeks:
              return (
                <Stack spacing={3}>
                  <SelectWeekDay formProps={formProps} />
                  <SelectWeeksRepeat formProps={formProps} />
                </Stack>
              );
            case FrequencyType.StartEndDayRepeatMonths:
              return (
                <Stack spacing={3}>
                  <SelectStartEndMonth formProps={formProps} />
                  <SelectMonthsRepeat formProps={formProps} />
                </Stack>
              );
            case FrequencyType.StartEndDaySelectedMonths:
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
              <SelectFrequencyType
                formProps={formProps}
                onChangeFormType={onChangeFormType}
                setFieldValue={formProps.setFieldValue}
              />
              {extraFields((isBeenChanged ? formType : currentFormType))}
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
