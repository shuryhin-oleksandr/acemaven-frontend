import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {getBookingRequestListThunk} from "../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
//components
import Layout from "../../../components/BaseLayout/Layout";
import BookingAgentPage from "./BookingAgentPage";
import {getBookingRequestListSelector, getIsFetching} from "../../../../_BLL/selectors/booking/bookingAgentSelector";


const BookingAgentContainer:React.FC = () => {

    const [mode, setMode] = useState("sea");
    const [directory, setDirectory] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [search_column, setSearchColumn] = useState("");
    const [isSearchMode, setSearchMode] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingRequestListThunk(mode, "", "", ""));
    }, [dispatch]);

    const bookingList = useSelector(getBookingRequestListSelector);

    return (
      <Layout>
              <BookingAgentPage bookingList={bookingList ? bookingList : []}
                                  mode={mode}
                                  setMode={setMode}
                                  directory={directory}
                                  setDirectory={setDirectory}
                                  searchValue={searchValue}
                                  setSearchValue={setSearchValue}
                                  search_column={search_column}
                                  setSearchColumn={setSearchColumn}
                                  isSearchMode={isSearchMode}
                                  setSearchMode={setSearchMode}
                                  dispatch={dispatch}
              />
      </Layout>
    )
}

export default BookingAgentContainer