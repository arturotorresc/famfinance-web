enum Month {
  Enero = "Enero",
  Febrero = "Febrero",
  Marzo = "Marzo",
  Abril = "Abril",
  Mayo = "Mayo",
  Junio = "Junio",
  Julio = "Julio",
  Agosto = "Agosto",
  Septiembre = "Septiembre",
  Octubre = "Octubre",
  Noviembre = "Noviembre",
  Diciembre = "Diciembre",
}

enum DayOfTheWeek {
  Domingo = "Domingo",
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miercoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sabado",
}

enum MonthStartEnd {
  Inicio = "Inicio",
  Fin = "Fin",
}

enum FrequencyType {
  OneTime = "Única ocasión",
  SameWeekDayRepeatForWeeks = "Recurrente: Mismo día de la semana cada N semanas",
  StartEndDayRepeatMonths = "Recurrente: Inicio o fin de mes cada N meses",
  StartEndDaySelectedMonths = "Recurrente: Inicio o fin de mes en meses selectos",
  SameDayRepeatMonths = "Recurrente: Mismo día del mes, cada N meses",
  SameDaySelectedMonths = "Recurrente: Mismo día del mes en meses selectos",
}

const months = [
  Month.Enero,
  Month.Febrero,
  Month.Marzo,
  Month.Abril,
  Month.Mayo,
  Month.Junio,
  Month.Julio,
  Month.Agosto,
  Month.Septiembre,
  Month.Octubre,
  Month.Noviembre,
  Month.Diciembre,
];

const daysOfTheWeek = [
  DayOfTheWeek.Domingo,
  DayOfTheWeek.Lunes,
  DayOfTheWeek.Martes,
  DayOfTheWeek.Miercoles,
  DayOfTheWeek.Jueves,
  DayOfTheWeek.Viernes,
  DayOfTheWeek.Sabado,
];

const monthStartEnd = [MonthStartEnd.Inicio, MonthStartEnd.Fin];

export {
  Month,
  DayOfTheWeek,
  MonthStartEnd,
  FrequencyType,
  months,
  daysOfTheWeek,
  monthStartEnd,
};
