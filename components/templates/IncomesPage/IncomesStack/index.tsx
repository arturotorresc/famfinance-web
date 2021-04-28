import { Stack, useToast } from "@chakra-ui/react";
import IncomesBox from "../IncomesBox";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import fetcher from "../../../../fetchers/fetcher";

interface IIncome {
  _id: string;
  title: string;
  from: string;
  until: string;
  qty: number;
  category: string;
  frequency: string;
}

interface IData {
  income: IIncome[];
}

interface IKey {
  _id: string;
}

export default function IncomesStack() {
  const router = useRouter();

  const { status, data, error, isFetching, refetch } = useQuery(
    "incomes",
    async () => {
      const { data } = await fetcher.get<IData>("/income");
      return data;
    }
  );

  console.log(data);

  const toast = useToast();

  return (
    <Stack>
      {isFetching ? (
        <div>Recuperando la información ...</div>
      ) : (
        data?.income.map((income) => (
          <IncomesBox
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
    </Stack>
  );
}
