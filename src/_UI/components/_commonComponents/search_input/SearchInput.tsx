import React from "react";
import { SearchField, SearchIcon, SearchWrap } from "./search-input-styles";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import { filterByThunk } from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import search_icon from "../../../../_UI/assets/icons/rates&services/search_loop.svg";
import { getFilteredRateListThunk } from "../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {getClientQuotesThunk} from "../../../../_BLL/thunks/quotes/clientQuotesThunk";

type PropsType = {
  setSearchMode: VoidFunctionType;
  setSearchValue: VoidFunctionType;
  dispatch: VoidFunctionType;
  direction: string;
  type: string;
  column_name: string;
  searchValue: string;
  searchColumn: string;
  thunkName?: string;
  setSearchColumn: VoidFunctionType;
};

const SearchInput: React.FC<PropsType> = ({
  setSearchMode,
  setSearchValue,
  dispatch,
  thunkName,
  setSearchColumn,
  ...props
}) => {
  let handleKeyPress = (event: any, value: any) => {
    if (event.key === "Enter") {
      searchHandler(value.value);
    }
  };

  let searchHandler = (value: any) => {
    setSearchValue(value);
    if(thunkName === "rates") {
      dispatch(
          getFilteredRateListThunk(
              props.direction,
              props.type,
              props.column_name,
              props.searchColumn,
              value
          )
      )
    } else if(thunkName === "quotes") {
        dispatch( getClientQuotesThunk(
            props.type,
            props.column_name,
            props.searchColumn,
            value
            )
        )
    } else {
      dispatch(
          filterByThunk(
              props.direction,
              props.type,
              props.column_name,
              props.searchColumn,
              value
          )
      );
    }
  };

  return (
    <SearchWrap>
      <SearchField
        onBlur={() => setSearchMode(false)}
        placeholder="Type..."
        onKeyPress={(event) => handleKeyPress(event, event.currentTarget)}
        onFocus={() => setSearchColumn(props.column_name)}
      />
      <SearchIcon>
        <img src={search_icon} alt="" />
      </SearchIcon>
    </SearchWrap>
  );
};

export default SearchInput;
