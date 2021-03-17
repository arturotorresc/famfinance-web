import {Stack, useToast} from "@chakra-ui/react";
import GoalBox from "../GoalBox";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import fetcher from "../../../../fetchers/fetcher";

interface IGoal{
    _id: string;
    title: String;
    deadline: String;
    description: String;
    qty: Number;
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

export default function GoalStask(){

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
                    title: "Goal Deleted!",
                    description:
                      "You have succesfully deleted the goal ",
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
    
    return(
        <Stack>
            {isFetching ? (
                <div>Retrieving Information ...</div>
            ) : 
                data?.goal.map(goal => (
                    <GoalBox onDeleteClicked= {onDeleteClicked} key={goal._id} _id={goal._id} title={goal.title} description={goal.description} deadline={goal.deadline} qty={goal.qty}/>
                ))
            }
        </Stack>
    );
}