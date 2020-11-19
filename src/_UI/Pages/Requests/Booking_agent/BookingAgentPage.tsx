import React, { useState, useEffect } from "react";
import {
  BookingContent,
  BookingWrapper,
  ContentHeader,
  ContentTable,
  ContentTitle,
} from "./booking-agent-styles";
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import AgentBookingListTable from "./tables/AgentBookingListTable";
import { useDispatch, useSelector } from "react-redux";
import { getBookingRequestListThunk } from "../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import { AppStateType } from "../../../../_BLL/store";

type PropsType = {};

const BookingAgentPage: React.FC<PropsType> = ({}) => {
  const [mode, setMode] = useState("sea");
  const [directory, setDirectory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [search_column, setSearchColumn] = useState("");

  const [isSearchMode, setSearchMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingRequestListThunk(mode, "", "", ""));
  }, [dispatch]);

  const bookingList = useSelector(
    (state: AppStateType) => state.agent_booking.booking_request_list
  );

  console.log("bookingList", bookingList);
  return (
    <BookingWrapper>
      <BookingContent>
        <ContentHeader>
          <ContentTitle>Bookings</ContentTitle>
          <OptionsDeliveryButtons
            directory={directory}
            mode={mode}
            setMode={setMode}
            searchColumn={search_column}
            searchValue={searchValue}
            thunkName="agent_booking"
            dispatch={dispatch}
          />
        </ContentHeader>
        <ContentTable>
          <AgentBookingListTable
            mode={mode}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchColumn={search_column}
            setSearchColumn={setSearchColumn}
            directory={directory}
            setDirectory={setDirectory}
            isSearchMode={isSearchMode}
            setSearchMode={setSearchMode}
            bookingList={bookingList}
          />
        </ContentTable>
      </BookingContent>
    </BookingWrapper>
  );
};

export default BookingAgentPage;
