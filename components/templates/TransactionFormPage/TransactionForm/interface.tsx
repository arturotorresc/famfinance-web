import { FormikProps, FormikHelpers } from "formik";
import { ChangeEventHandler } from "react";
import { FrequencyType } from "../types";

interface IProps {
  initialValues: ITransactionInitialValues;
  onSubmit: (
    vals: ITransactionInitialValues, // TODO: Add more
    actions: FormikHelpers<ITransactionInitialValues> // TODO: Add more
  ) => void;
}

interface ISelectFrequencyTypeProps {
  onChangeFormType: ChangeEventHandler<HTMLSelectElement>;
  formProps: FormikProps<ITransactionInitialValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

interface IBasicFormFieldsProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

interface ITransactionInitialValues {
  title: string;
  quantity: number;
  category: string;
  startDate: string | null;
  endDate: string | null;
  frequencyType: FrequencyType;
  day: number | null;
  weekDay: string | null;
  weeksRepeat: number | null;
  monthsRepeat: number | null;
  months: string[] | null;
  startEndMonth: string | null;
}

interface ISelectMultipleMonthsProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

interface ISelectStartEndMonthProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

interface ISelectDayProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

interface ISelectWeekDayProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

interface ISelectWeeksRepeatProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

interface ISelectMonthsRepeatProps {
  formProps: FormikProps<ITransactionInitialValues>;
}

export type {
  IProps,
  ITransactionInitialValues,
  ISelectFrequencyTypeProps,
  ISelectMultipleMonthsProps,
  IBasicFormFieldsProps,
  ISelectStartEndMonthProps,
  ISelectDayProps,
  ISelectWeekDayProps,
  ISelectWeeksRepeatProps,
  ISelectMonthsRepeatProps,
};
