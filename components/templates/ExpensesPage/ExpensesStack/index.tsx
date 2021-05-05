import { Stack, useToast } from "@chakra-ui/react";
import ExpensesBox from "../ExpensesBox";
import { useRouter } from "next/router";
import fetcher from "../../../../fetchers/fetcher";
import { useQuery, useMutation } from "react-query";

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

interface IExpense {
  _id: string;
  title: string;
  from: string;
  until: string;
  qty: number;
  category: string;
  frequency: IFrequency;
}

interface IData {
  expense: IExpense[];
}

interface IKey {
  _id: string;
}

export default function ExpensesStack() {
  const router = useRouter();

  const { status, data, error, isFetching, refetch } = useQuery(
    "expenses",
    async () => {
      const { data } = await fetcher.get<IData>("/expense");
      return data;
    }
  );

  console.log(data);

  const toast = useToast();

  const deleteMutation = useMutation((id) => fetcher.delete(`/expense/${id}`));

  function onDeleteClicked(key: string) {
    deleteMutation.mutate(key, 
          {
            onSuccess: () => {
                refetch();
                toast({
                  status: "success",
                  title: "Gasto Borrado",
                  description: `El Gasto fue Borrado Exitosamente`,
                });
              },
              onError: () => {
                toast({
                  status: "error",
                  title: "Oops! Algo Ocurrio!",
                  description: "Por favor, intenta de nuevo!",
                });
              },
        }
    )
  }

  function onUpdateClicked(_id: string){
    var pathName = ("/expense/").concat(_id);
    router.push({
        pathname: pathName
    })
  }

  return (
    <Stack>
      {isFetching ? (
        <div>Recuperando la información ...</div>
      ) : (
        data?.expense.map((expense) => (
          <ExpensesBox
            onDeleteClicked = {onDeleteClicked}
            onUpdateClicked = {onUpdateClicked}
            key={expense._id}
            _id={expense._id}
            title={expense.title}
            from={expense.from}
            until={expense.until}
            qty={expense.qty}
            category={expense.category}
            frequency={expense.frequency}
          />
        ))
      )}
    </Stack>
  );
}
