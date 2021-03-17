import { FormikHelpers } from "formik";

interface IInitialValues {
  title: string;
  quantity: number;
  startDate: string;
  endDate: string;
  movementType: string;
  category: string;
  day: number;
  months: [string];
}

interface IProps {
  initialValues: IInitialValues;
  onSubmit: (
    vals: IInitialValues,
    actions: FormikHelpers<IInitialValues>
  ) => void;
}

export type { IInitialValues, IProps };