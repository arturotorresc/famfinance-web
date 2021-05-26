import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {Box, Heading, Text, Flex, VStack,Stack, IconButton, Divider } from "@chakra-ui/react";

enum FrequencyType {
    OneTime = "Única ocasión",
    SameWeekDayRepeatForWeeks = "Recurrente: Mismo día de la semana cada N semanas",
    StartEndDayRepeatMonths = "Recurrente: Inicio o fin de mes cada N meses",
    StartEndDaySelectedMonths = "Recurrente: Inicio o fin de mes en meses selectos",
    SameDayRepeatMonths = "Recurrente: Mismo día del mes, cada N meses",
    SameDaySelectedMonths = "Recurrente: Mismo día del mes en meses selectos",
}

interface IFrequency {
    _id: string;
    frequencyType: string;
    day: number;
    weekDay: string;
    weeksRepeat: number;
    monthsRepeat: number;
    months: string[];
    startEndMonth: string;
}

interface IProps{
    key: string,
    _id: string,
    title: string,
    from: string,
    until: string,
    qty: number,
    category: string,
    frequency: IFrequency,
    onDeleteClicked: (key: string) => void
    onUpdateClicked: (_id: string) => void
}

function englishCategoryToSpanish(category: string): string {
  switch(category) {
    case 'WORK': return 'Trabajo';
    case 'FOOD': return 'Comida';
    case 'ENTERTAINMENT': return 'Entretenimiento';
    case 'MISC': return 'Miscelaneo';
    case 'SUBSCRIPTION': return 'Suscripción';
    default: return 'Desconocido';
  }
}

function formatDate(date: Date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();
  if (day.length == 1) day = "0" + day;
  if (month.length == 1) month = "0" + month;
  return day + "-" + month + "-" + year;
}

export default function ExpensesBox(props: IProps){
    let selectedMonths = function (months: string[]){
        var monthsString = "";
        months.map((month) => (monthsString = monthsString.concat(month.concat(" "))));
        return monthsString;
    }

    let extraFields = function (frequency: IFrequency) {
        switch (frequency.frequencyType) {
          case FrequencyType.OneTime:
            return (
                <Stack spacing={3}>
                    <Heading fontSize="l">{frequency.frequencyType}</Heading>
                </Stack>
            );
          case FrequencyType.SameDayRepeatMonths:
            return (
              <Stack spacing={3}>
                <Heading fontSize="l">{frequency.frequencyType}</Heading>
                <Text>Día del Mes: {frequency.day}</Text>
                <Text>Frecuencia en Meses: {frequency.monthsRepeat}</Text>
              </Stack>
            );
          case FrequencyType.SameDaySelectedMonths:
            return (
              <Stack spacing={3}>
                <Heading fontSize="l">{frequency.frequencyType}</Heading>
                <Text>Día del Mes: {frequency.day}</Text>
              </Stack>
            );
          case FrequencyType.SameWeekDayRepeatForWeeks:
            return (
              <Stack spacing={3}>
                <Heading fontSize="l">{frequency.frequencyType}</Heading>
                <Text>Día de la Semana: {frequency.weekDay}</Text>
                <Text>Frecuencia en Semanas: {frequency.weeksRepeat}</Text>
                <Text>Meses Selectos:</Text>
                <Text>{selectedMonths(frequency.months)}</Text>
              </Stack>
            );
          case FrequencyType.StartEndDayRepeatMonths:
            return (
              <Stack spacing={3}>
                <Heading fontSize="l">{frequency.frequencyType}</Heading>
                <Text>{frequency.startEndMonth}</Text>
                <Text>Frecuencia en Meses: {frequency.monthsRepeat}</Text>
              </Stack>
            );
          case FrequencyType.StartEndDaySelectedMonths:
            return (
              <Stack spacing={3}>
                <Heading fontSize="l">{frequency.frequencyType}</Heading>
                <Text>{frequency.startEndMonth}</Text>
                <Text>Meses Selectos:</Text>
                <Text>{selectedMonths(frequency.months)}</Text>
              </Stack>
            );
        }
    };

    return(
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
                <VStack flex="1" alignItems="left">
                    <Heading fontSize="xl">{props.title}</Heading>
                    <Text>Desde: {formatDate(new Date(props.from))}</Text>
                    <Text>Categoría: {englishCategoryToSpanish(props.category)}</Text>
                    {extraFields(props.frequency)}
                </VStack>
                <VStack flex="1" alignItems="left">
                    <Text mt={4} fontSize="xl">${props.qty} MXN</Text>
                </VStack>
                <VStack >
                    <IconButton  aria-label="borrar" icon ={<DeleteIcon/>} onClick={() => props.onDeleteClicked(props._id)}/>
                    <IconButton  aria-label="editar" icon ={<EditIcon/>} onClick={() => props.onUpdateClicked(props._id)}/>
                </VStack>
            </Flex>
            <Divider margin="15px 5px" />
        </Box>
    );
}