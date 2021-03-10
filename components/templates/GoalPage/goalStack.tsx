import {Stack} from "@chakra-ui/react";
import GoalBox from "./goalBox";
import { useQuery } from "react-query";
import fetcher from "../../../fetchers/fetcher";

interface Goal{
    title: String,
    deadline: String,
    description: String,
    qty: Number
}

interface Data{
    goal: Goal[]
}

export default function GoalStask(){

    const {status, data, error, isFetching} = useQuery('goals', async () => {
        const { data } = await fetcher.get<Data>("/api/goal");
        return data;
    })

    return(
        <Stack>
            {isFetching ? (
                <div>Retrieving Information ...</div>
            ) : 
                data?.goal.map(goal => (
                    <GoalBox title={goal.title} description={goal.description} deadline={goal.deadline} qty={goal.qty}/>
                ))
            }
        </Stack>
    );
}