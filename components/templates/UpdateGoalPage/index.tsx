import Head from "next/head";
import { useMutation } from "react-query";
import fetcher from "../../../fetchers/fetcher";
import { Flex, Box, useToast, Heading } from "@chakra-ui/react";
import UpdateForm from "./UpdateForm";
import parseDate from "date-fns/parse";
import { useRouter } from "next/router";

interface IValues {
  _id: string;
  title: string;
  deadline: string;
  description: string;
  qty: number;
}

function formatDate(date: Date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear().toString();
  if (day.length == 1) day = "0" + day;
  if (month.length == 1) month = "0" + month;
  return day + "-" + month + "-" + year;
}

export default function UpdateGoal() {
  const mutation = useMutation((goalData: IValues) =>
    fetcher.put("/goal", goalData)
  );
  const toast = useToast();

  const router = useRouter();

  const _id =
    router.query._id && typeof router.query._id == "string"
      ? router.query._id
      : "";
  const title =
    router.query.title && typeof router.query.title == "string"
      ? router.query.title
      : "";
  const deadline =
    router.query.deadline && typeof router.query.deadline == "string"
      ? formatDate(new Date(router.query.deadline))
      : formatDate(new Date());
  const description =
    router.query.description && typeof router.query.description == "string"
      ? router.query.description
      : "";
  const qty =
    router.query.qty && typeof router.query.qty == "string"
      ? parseFloat(router.query.qty)
      : 0.0;

  const data: IValues = {
    _id: _id,
    title: title,
    deadline: deadline,
    description: description,
    qty: qty,
  };

  return (
    <div>
      <Head>
        <title>Editar una Meta</title>
      </Head>
      <Flex flexDir="column">
        <Flex w="550px" mt={30} mx="auto" flexDir="column" p={3} mb={6}>
          <UpdateForm
            initialValues={{
              title: data.title,
              description: data.description,
              deadline: data.deadline,
              qty: data.qty,
            }}
            onSubmit={(vals, actions) => {
              const deadline = parseDate(
                vals.deadline,
                "dd-MM-yyyy",
                new Date()
              );
              mutation.mutate(
                {
                  _id: data._id,
                  title: vals.title,
                  description: vals.description,
                  deadline: deadline.toString(),
                  qty: vals.qty,
                },
                {
                  onSuccess: (res) => {
                    toast({
                      title: "Meta actualizada!",
                      description: "Ha editado una meta exitosamente!",
                      status: "success",
                    });
                    actions.setSubmitting(false);
                    router.back();
                  },
                  onError: (error) => {
                    toast({
                      title: "Oops!",
                      description:
                        "Ha ocurrido un error! Porfavor, intente de nuevo",
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
