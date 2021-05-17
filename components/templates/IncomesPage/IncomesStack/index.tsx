import { useEffect } from "react";
import { Stack, useToast, Button } from "@chakra-ui/react";
import IncomesBox from "../IncomesBox";
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

interface IIncome {
  _id: string;
  title: string;
  from: string;
  until: string;
  qty: number;
  category: string;
  frequency: IFrequency;
}

interface IData {
  income: IIncome[];
}

interface IProps {
  categoryFilter: TransactionCategoryEnum | typeof SELECT_AN_OPTION_VALUE;
}

export default function IncomesStack({ categoryFilter }: IProps) {
  const router = useRouter();

  const { status, data, error, isFetching, refetch } = useQuery(
    "incomes",
    async () => {
      const { data } = await fetcher.get<IData>("/income", {
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
    fetcher.delete(`/income/${id}`)
  );

  useEffect(() => {
    refetch();
  }, [categoryFilter]);

  function onDeleteClicked(key: string) {
    deleteMutation.mutate(key, {
      onSuccess: () => {
        refetch();
        toast({
          status: "success",
          title: "Ingreso Borrado",
          description: `El Ingreso fue Borrado Exitosamente`,
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

  function onUpdateClicked(_id: string) {
    var pathName = "/edit-income/".concat(_id);
    router.push({
      pathname: pathName,
    });
  }

  function onCreateClicked(){
    router.push("/add-income");
  }

  return (
    <Stack>
      {isFetching ? (
        <div>Recuperando la información ...</div>
      ) : (
        data?.income.map((income) => (
          <IncomesBox
            onDeleteClicked={onDeleteClicked}
            onUpdateClicked={onUpdateClicked}
            key={income._id}
            _id={income._id}
            title={income.title}
            from={income.from}
            until={income.until}
            qty={income.qty}
            category={income.category}
            frequency={income.frequency}
          />
        ))
      )}
      <Button onClick={onCreateClicked}>Crear Nuevo Ingreso</Button>
    </Stack>
  );
}
