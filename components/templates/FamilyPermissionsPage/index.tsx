import React from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useTable } from "react-table";
import fetcher from "../../../fetchers/fetcher";

export function FamilyPermissionsPage() {
  const { data: familyMembers, isLoading } = useQuery("/users", () =>
    fetcher.get("/users").then((res) => res.data)
  );
  const tableData = React.useMemo(() => {
    return (familyMembers && familyMembers.users) || [];
  }, [familyMembers, isLoading]);
  const tableColumns = React.useMemo(() => {
    return [
      {
        Header: "Nombre",
        accessor: "name",
      },
      { Header: "Correo", accessor: "email" },
      { Header: "Rol", accessor: "role" },
    ];
  }, []);
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
  } = useTable({
    columns: tableColumns,
    data: tableData,
  });
  const { data: meData } = useQuery("/me", () =>
    fetcher.get("/me").then((res) => res.data)
  );
  return (
    <Box>
      <Head>
        <title>Family permissions - Famfinance</title>
      </Head>
      <Heading textAlign="center" fontSize="6xl" mt={8}>
        Family Permissions
      </Heading>
      <Flex
        mt={10}
        flexDir="column"
        w={["95%", "90%", null, "1200px"]}
        mx="auto"
      >
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Box>
  );
}
