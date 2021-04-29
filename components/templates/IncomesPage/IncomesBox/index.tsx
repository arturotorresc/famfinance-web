import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {Box, Heading, Text, Flex, VStack, IconButton, Divider } from "@chakra-ui/react";

interface IProps{
    key: string,
    _id: string,
    title: string,
    from: string,
    until: string,
    qty: number,
    category: string,
    frequency: string,
}

export default function IncomesBox(props: IProps){
    return(
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
                <VStack flex="1" alignItems="left">
                    <Heading fontSize="xl">{props.title}</Heading>
                    <Text>{props.from}</Text>
                    <Text>{props.category} </Text>
                </VStack>
                <VStack flex="1" alignItems="left">
                    <Text mt={4} fontSize="xl">${props.qty} MXN</Text>
                </VStack>
                <VStack >
                    <IconButton  aria-label="borrar" icon ={<DeleteIcon/>} />
                    <IconButton  aria-label="editar" icon ={<EditIcon/>} />
                </VStack>
            </Flex>
            <Divider margin="15px 5px" />
        </Box>
    );
}