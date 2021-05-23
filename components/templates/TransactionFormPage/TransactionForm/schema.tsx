import isDate from "date-fns/isDate";
import parseDate from "date-fns/parse";
import * as Yup from "yup";

const schema = Yup.object({
  title: Yup.string().required("Campo requerido"),
  quantity: Yup.number()
    .min(0, "Introduzca un número no-negativo")
    .required("Campo requerido"),
  category: Yup.string().required("Campo requerido"),
  startDate: Yup.date()
    .transform((val: any, originalVal: string | Date) => {
      if (originalVal instanceof Date) {
        return originalVal;
      }
      const parsedDate = isDate(originalVal)
        ? originalVal
        : parseDate(originalVal, "dd-MM-yyyy", new Date());
      return parsedDate;
    })
    .required("Campo requerido")
    .typeError("Introduzca una fecha válida en formato dd-mm-aaaa"),
  endDate: Yup.date()
    .transform((val: any, originalVal: string | Date) => {
      if (originalVal instanceof Date) {
        return originalVal;
      }
      const parsedDate = isDate(originalVal)
        ? originalVal
        : parseDate(originalVal, "dd-MM-yyyy", new Date());
      return parsedDate;
    })
    .required("Campo requerido")
    .typeError("Introduzca una fecha válida en formato dd-mm-aaaa")
    .when("startDate", {
      is: true,
      then: Yup.date().min(
        Yup.ref("startDate"),
        "Fecha de Terminación debe ser después de la de Inicio"
      ),
    }),
  day: Yup.number()
    .integer("Introduzca un día válido")
    .min(1, "Introduzca un día valido")
    .max(28, "Introduzca un día valido"),
  monthsRepeat: Yup.number()
    .integer("Introduzca un valor entero")
    .min(1, "Introduzca un número positivo"),
  weeksRepeat: Yup.number()
    .integer("Introduzca un valor entero")
    .min(1, "Introduzca un número positivo"),
});

export { schema };
