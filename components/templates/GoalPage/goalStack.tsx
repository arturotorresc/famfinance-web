import {Stack} from "@chakra-ui/react";
import GoalBox from "./goalBox";

export default function GoalStask(){
    return(
        <Stack>
            <GoalBox></GoalBox>
            <GoalBox></GoalBox>
            <GoalBox></GoalBox>
            <GoalBox></GoalBox>
        </Stack>
    );
}