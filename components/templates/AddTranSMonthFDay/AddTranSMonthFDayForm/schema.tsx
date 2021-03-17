import isDate from "date-fns/isDate";
import parseDate from "date-fns/parse";
import * as Yup from "yup";

const schema = Yup.object({
  title: Yup.string().min(2).required(),
  quantity: Yup.number().min(0).required(),
  startDate: Yup.date()
    .transform((val: any, originalVal: string | Date) => {
      if (originalVal instanceof Date) {
        return originalVal;
      }
      const parsedDate = isDate(originalVal)
        ? originalVal
        : parseDate(originalVal, "dd-MM-yyyy", new Date());
      console.log(parsedDate);
      return parsedDate;
    })
    .required("Por favor introduzca una fecha en formato dd-MM-aaaa"),
  endDate: Yup.date()
    .transform((val: any, originalVal: string | Date) => {
      if (originalVal instanceof Date) {
        return originalVal;
      }
      const parsedDate = isDate(originalVal)
        ? originalVal
        : parseDate(originalVal, "dd-MM-yyyy", new Date());
      console.log(parsedDate);
      return parsedDate;
    })
    .required("Por favor introduzca una fecha en formato dd-MM-aaaa"),
  movementType: Yup.string().oneOf(["income", "expense"]).required(),
  category: Yup.string().required(),
  day: Yup.number().min(1).max(28).required(),
  months: Yup.array().of(Yup.string()).required(),
});

export { schema };