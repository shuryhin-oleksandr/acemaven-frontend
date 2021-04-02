import React from "react";
//types
import { BookingInfoType } from "src/_BLL/types/bookingTypes";
//components
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import AgentBookingListTable from "./tables/AgentBookingListTable";
import NoQuotesCard from "../../quotes/NoQuotesCard";
//styles
import {
  BookingContent,
  BookingWrapper,
  ContentHeader,
  ContentTable,
  ContentTitle,
} from "./booking-agent-styles";



type PropsType = {
  bookingList:  BookingInfoType[],
  mode: string,
  setMode: (value: string) => void,
  directory: string,
  setDirectory: (value: string) => void,
  searchValue: string,
  setSearchValue: (value: string) => void,
  search_column: string,
  setSearchColumn: (value: string) => void,
  isSearchMode: boolean,
  setSearchMode: (value: boolean) => void,
  dispatch: any
  text: string
};

const BookingAgentPage: React.FC<PropsType> = ({bookingList, ...props}) => {
  return (
    <BookingWrapper>
      <BookingContent style={{padding: "50px 80px 50px 0"}}>
        <ContentHeader>
          <ContentTitle>Bookings</ContentTitle>
          <OptionsDeliveryButtons
            directory={props.directory}
            mode={props.mode}
            setMode={props.setMode}
            searchColumn={props.search_column}
            searchValue={props.searchValue}
            thunkName="agent_booking"
          />
        </ContentHeader>
        {bookingList.length === 0
            ? <NoQuotesCard text={props.text}/>
            : <ContentTable>
              <AgentBookingListTable
                  mode={props.mode}
                  searchValue={props.searchValue}
                  setSearchValue={props.setSearchValue}
                  searchColumn={props.search_column}
                  setSearchColumn={props.setSearchColumn}
                  directory={props.directory}
                  setDirectory={props.setDirectory}
                  isSearchMode={props.isSearchMode}
                  setSearchMode={props.setSearchMode}
                  bookingList={bookingList}
              />
            </ContentTable>
        }
      </BookingContent>
    </BookingWrapper>
  );
};

export default BookingAgentPage;
