import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {Box, Heading, Text, Flex, VStack, IconButton } from "@chakra-ui/react";

export default function GoalBox({title, deadline, description, qty}){
    return(
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
                <VStack flex="1" alignItems="left">
                    <Heading fontSize="xl">{title}</Heading>
                    <Text>{deadline}</Text>
                    <Text>{description} </Text>
                </VStack>
                <VStack flex="1" alignItems="left">
                    <Text mt={4} fontSize="xl">${qty} MXN</Text>
                </VStack>
                <VStack >
                    <IconButton  aria-label="delete" icon ={<DeleteIcon/>}/>
                    <IconButton  aria-label="edit" icon ={<EditIcon/>}/>
                </VStack>
            </Flex>
            
        </Box>
    );
}