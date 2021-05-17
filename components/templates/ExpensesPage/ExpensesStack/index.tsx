import { useEffect } from "react";
import { Stack, useToast, Button } from "@chakra-ui/react";
import ExpensesBox from "../ExpensesBox";
import { useRouter } from "next/router";
import fetcher from "../../../../fetchers/fetcher";
import { useQuery, useMutation } from "react-query";
import { TransactionCategoryEnum } from "../../TransactionFormPage/types";
import { SELECT_AN_OPTION_VALUE } from "../../../../constants";

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
interface IProps {
  categoryFilter: TransactionCategoryEnum | typeof SELECT_AN_OPTION_VALUE;
}

export default function ExpensesStack({ categoryFilter }: IProps) {
  const router = useRouter();

  const { status, data, error, isFetching, refetch } = useQuery(
    "expenses",
    async () => {
      const { data } = await fetcher.get<IData>("/expense", {
        params:
          categoryFilter === SELECT_AN_OPTION_VALUE
            ? undefined
            : {
                category: categoryFilter,
              },
      });
      return data;
    }
  );

  console.log(data);

  const toast = useToast();

  const deleteMutation = useMutation((id: string) =>
    fetcher.delete(`/expense/${id}`)
  );

  function onDeleteClicked(key: string) {
    deleteMutation.mutate(key, {
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
    });
  }

  useEffect(() => {
    refetch();
  }, [categoryFilter]);

  function onUpdateClicked(_id: string) {
    var pathName = "/edit-expense/".concat(_id);
    router.push({
      pathname: pathName,
    });
  }

  function onCreateClicked(){
    router.push("/add-expense");
  }

  return (
    <Stack>
      {isFetching ? (
        <div>Recuperando la información ...</div>
      ) : (
        data?.expense.map((expense) => (
          <ExpensesBox
            onDeleteClicked={onDeleteClicked}
            onUpdateClicked={onUpdateClicked}
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
      <Button onClick={onCreateClicked} >Crear Nuevo Gasto</Button>
    </Stack>
  );
}
