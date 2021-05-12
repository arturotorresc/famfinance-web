import React from "react";
import { Box, Select } from "@chakra-ui/react";
import { TransactionCategoryEnum } from "../../templates/TransactionFormPage/types";
import { translateCategory } from "../../templates/TransactionFormPage/TransactionForm/helpers";
import { SELECT_AN_OPTION_VALUE } from "../../../constants";

interface IProps {
  handleSelect: (
    value: TransactionCategoryEnum | typeof SELECT_AN_OPTION_VALUE
  ) => void;
}

export function FilterByCategory(props: IProps) {
  return (
    <Box>
      <Select
        onChange={(e) => {
          props.handleSelect(e.target.value as TransactionCategoryEnum);
        }}
      >
        <option value={SELECT_AN_OPTION_VALUE}>Sin filtro</option>
        {Object.keys(TransactionCategoryEnum).map((value) => {
          return (
            <option value={value}>
              {translateCategory(value as TransactionCategoryEnum)}
            </option>
          );
        })}
      </Select>
    </Box>
  );
}
