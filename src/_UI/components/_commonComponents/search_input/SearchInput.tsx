import React, {ChangeEvent, useState} from "react";
import { SearchField, SearchIcon, SearchWrap } from "./search-input-styles";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import { filterByThunk } from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import search_icon from "../../../../_UI/assets/icons/rates&services/search_loop.svg";
import { getFilteredRateListThunk } from "../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {getClientQuotesThunk} from "../../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getAgentQuotesListThunk} from "../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {getBookingRequestListThunk} from "../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import { IconButton } from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg'

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


    const [input_value, setInputValue] = useState('')

  let handleKeyPress = (event: any, value: any) => {
    if (event.key === "Enter") {
        //event.preventDefault()
        //event.currentTarget.blur()
        searchHandler(value.value);
        setInputValue(value.value)
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
    } else if (thunkName === 'quotes_agent') {
        dispatch(getAgentQuotesListThunk(
            props.type,
            props.column_name,
            props.searchColumn,
            value
           )
       )
    } else if(thunkName==="agent_booking"){
     dispatch(getBookingRequestListThunk(
         props.type,
         props.column_name,
         props.searchColumn,
         value
     ))
    }
    else {
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

  let backToBasisHandler = () => {
      searchHandler('')
      setSearchMode(false)
  }

   let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
   }

  return (
    <SearchWrap>
      <SearchField
        //onBlur={() => setSearchMode(false)}
        placeholder="Type..."
        onKeyPress={(event) => handleKeyPress(event, event.currentTarget)}
        onFocus={() => setSearchColumn(props.column_name)}
        name={`search_input.${props.searchColumn}`}
        value={input_value}
        onChange={onChangeHandler}
      />
      <IconButton onClick={backToBasisHandler} style={{position: 'absolute', right: '22px', top: '3px'}}>
          <img src={close_icon} alt="" style={{width: '9px'}}/>
      </IconButton>
      <SearchIcon>
        <img src={search_icon} alt="" />
      </SearchIcon>
    </SearchWrap>
  );
};

export default SearchInput;
