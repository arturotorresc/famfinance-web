import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {Box, Heading, Text, Flex, VStack, IconButton } from "@chakra-ui/react";

interface IProps{
    title: String,
    deadline: String,
    description: String,
    qty: Number
}

export default function GoalBox(props: IProps){
    return(
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
                <VStack flex="1" alignItems="left">
                    <Heading fontSize="xl">{props.title}</Heading>
                    <Text>{props.deadline}</Text>
                    <Text>{props.description} </Text>
                </VStack>
                <VStack flex="1" alignItems="left">
                    <Text mt={4} fontSize="xl">${props.qty} MXN</Text>
                </VStack>
                <VStack >
                    <IconButton  aria-label="delete" icon ={<DeleteIcon/>}/>
                    <IconButton  aria-label="edit" icon ={<EditIcon/>}/>
                </VStack>
            </Flex>
            
        </Box>
    );
}