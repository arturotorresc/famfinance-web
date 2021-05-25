import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, useToast } from "@chakra-ui/react";
import CreateForm, { IValues } from "./CreateForm";
import parseDate from "date-fns/parse";

function formatDate(date: Date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();
  if (day.length == 1) day = "0" + day;
  if (month.length == 1) month = "0" + month;
  return day + "-" + month + "-" + year;
}

export default function CreateGoalPage() {
  const mutation = useMutation((userData: IValues) =>
    fetcher.post("/goal", userData)
  );
  const toast = useToast();
  return (
    <div>
      <Head>
        <title>Agrega una Nueva Meta</title>
      </Head>
      <Flex flexDir="column">
        <Flex
          w="550px"
          mt={30}
          mx="auto"
          flexDir="column"
          p={3}
          mb={6}
        >
          <CreateForm
            initialValues={{
              title: "",
              description: "",
              qty: 0,
              deadline: formatDate(new Date())
            }}
            onSubmit={(vals, actions) => {
              const deadline = parseDate(
                vals.deadline,
                "dd-MM-yyyy",
                new Date()
              );
              mutation.mutate(
                {
                  title: vals.title,
                  description: vals.description,
                  qty: vals.qty,
                  deadline: deadline.toString(),
                },
                {
                  onSuccess: (res) => {
                    toast({
                      title: "Meta agregada!",
                      description: "Se ha agregado una nueva meta exitosamente",
                      status: "success",
                    });
                    actions.setSubmitting(false);
                  },
                  onError: (error) => {
                    toast({
                      title: "Oops!",
                      description: "Ha ocurrido un error! Por favor, intente de nuevo!",
                      status: "error",
                    });
                    actions.setSubmitting(false);
                  },
                }
              );
            }}
          />
        </Flex>
      </Flex>
    </div>
  );
}