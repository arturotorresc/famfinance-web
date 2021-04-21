import { FormikProps, FormikHelpers } from "formik";
import { ChangeEventHandler } from "react";
import { IncomeType } from "../types";

interface IProps {
  initialValues: IAddIncomeInitialValues;
  onSubmit: (
    vals: IAddIncomeInitialValues, // TODO: Add more
    actions: FormikHelpers<IAddIncomeInitialValues> // TODO: Add more
  ) => void;
}

interface ISelectIncomeTypeProps {
  onChangeFormType: ChangeEventHandler<HTMLSelectElement>;
  formProps: FormikProps<IAddIncomeInitialValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

interface IBasicFormFieldsProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

interface IAddIncomeInitialValues {
  title: string;
  quantity: number;
  category: string;
  startDate: string | null;
  endDate: string | null;
  frequencyType: IncomeType;
  day: number | null;
  weekDay: string | null;
  weeksRepeat: number | null;
  monthsRepeat: number | null;
  months: [string] | null;
  startEndMonth: string | null;
}

interface ISelectMultipleMonthsProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

interface ISelectStartEndMonthProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

interface ISelectDayProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

interface ISelectWeekDayProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

interface ISelectWeeksRepeatProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

interface ISelectMonthsRepeatProps {
  formProps: FormikProps<IAddIncomeInitialValues>;
}

export type {
  IProps,
  IAddIncomeInitialValues,
  ISelectIncomeTypeProps,
  ISelectMultipleMonthsProps,
  IBasicFormFieldsProps,
  ISelectStartEndMonthProps,
  ISelectDayProps,
  ISelectWeekDayProps,
  ISelectWeeksRepeatProps,
  ISelectMonthsRepeatProps,
};
