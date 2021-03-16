import {Stack} from "@chakra-ui/react";
import GoalBox from "../GoalBox";
import { useQuery } from "react-query";
import fetcher from "../../../../fetchers/fetcher";

interface IGoal{
    _id: string,
    title: String,
    deadline: String,
    description: String,
    qty: Number
}

interface IData{
    goal: IGoal[]
}

export default function GoalStask(){

    const {status, data, error, isFetching} = useQuery('goals', async () => {
        const { data } = await fetcher.get<IData>("/goal");
        return data;
    })
    
    return(
        <Stack>
            {isFetching ? (
                <div>Retrieving Information ...</div>
            ) : 
                data?.goal.map(goal => (
                    <GoalBox key={goal._id} title={goal.title} description={goal.description} deadline={goal.deadline} qty={goal.qty}/>
                ))
            }
        </Stack>
    );
}