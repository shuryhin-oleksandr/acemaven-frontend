import React, { useState, useRef } from "react";
import sort_arrows from "../../../../assets/icons/rates&services/sort_arrows.svg";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { filterByThunk } from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import { getFilteredRateListThunk } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { SortButton } from "./table-sort-button-style";
import {getClientQuotesThunk} from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";

type PropsType = {
  column_name: string;
  dispatch: VoidFunctionType;
  direction: string;
  mode: string;
  searchValue: string;
  searchColumn: string;
  thunkName?: string;
};

const TableSortButton: React.FC<PropsType> = ({
  column_name,
  dispatch,
  direction,
  mode,
  thunkName,
  ...props
}) => {
  const descendingOrder = useRef(false);

  return (
    <SortButton
      onClick={() => {
        if(thunkName === "rates") {
          dispatch(
              getFilteredRateListThunk(
                  direction,
                  mode,
                  descendingOrder.current ? `-${column_name}` : column_name,
                  props.searchColumn,
                  props.searchValue
              )
          )
        } else if(thunkName === 'quotes') {
          dispatch(getClientQuotesThunk(
              mode,
              descendingOrder.current ? `-${column_name}` : column_name,
              props.searchColumn,
              props.searchValue)
          )
        } else {
          dispatch(
              filterByThunk(
                  direction,
                  mode,
                  descendingOrder.current ? `-${column_name}` : column_name,
                  props.searchColumn,
                  props.searchValue
              )
          );
        }
        descendingOrder.current = !descendingOrder.current;
      }}
    >
      <img src={sort_arrows} alt="" />
    </SortButton>
  );
};

export default TableSortButton;
