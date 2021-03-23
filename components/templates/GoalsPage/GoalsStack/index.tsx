import {Stack, useToast} from "@chakra-ui/react";
import GoalBox from "../GoalBox";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import fetcher from "../../../../fetchers/fetcher";

interface IGoal{
    _id: string;
    title: string;
    deadline: string;
    description: string;
    qty: number;
}

interface IData{
    goal: IGoal[]
}

interface IKey{
    _id: string
}

interface IDeleteData{
    data: IKey
}

export default function GoalsStack(){

    const router = useRouter();

    const {status, data, error, isFetching, refetch} = useQuery('goals', async () => {
        const { data } = await fetcher.get<IData>("/goal");
        return data;
    })

    const mutation = useMutation((goalData: IDeleteData) =>
        fetcher.delete("/goal", goalData)
    );

    const toast = useToast();

    function onDeleteClicked(key: string) {
        mutation.mutate({
            data: {_id: key}
        },
              {
                onSuccess: (res) => {
                    refetch();
                  toast({
                    title: "Meta eliminada!",
                    description:
                      "Ha eliminado exitósamente una meta",
                    status: "success",
                  });
                },
                onError: (error) => {
                  toast({
                    title: "Oops!",
                    description: "An error has ocurred! Please try again!",
                    status: "error",
                  });
                },
            }
        )
    }

    function onUpdateClicked(_id: string, title: string, description: string, deadline: string, qty: number){
        router.push({
            pathname:"/updateGoal",
            query: {
                _id,
                title,
                description,
                deadline,
                qty
            }
        })
    }
    
    return(
        <Stack>
            {isFetching ? (
                <div>Recuperando la información ...</div>
            ) : 
                data?.goal.map(goal => (
                    <GoalBox onDeleteClicked= {onDeleteClicked} onUpdateClicked= {onUpdateClicked} key={goal._id} _id={goal._id} title={goal.title} description={goal.description} deadline={goal.deadline} qty={goal.qty}/>
                ))
            }
        </Stack>
    );
}