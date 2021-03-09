import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {Box, Heading, Text, Flex, VStack, IconButton } from "@chakra-ui/react";

export default function GoalBox(){
    return(
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
                <VStack flex="1" alignItems="left">
                    <Heading fontSize="xl">title</Heading>
                    <Text>deadline</Text>
                    <Text>El perro (Canis familiaris o Canis luputre </Text>
                </VStack>
                <VStack flex="1" alignItems="left">
                    <Text mt={4} fontSize="xl">$4000</Text>
                </VStack>
                <VStack >
                    <IconButton  aria-label="delete" icon ={<DeleteIcon/>}/>
                    <IconButton  aria-label="edit" icon ={<EditIcon/>}/>
                </VStack>
            </Flex>
            
        </Box>
    );
}