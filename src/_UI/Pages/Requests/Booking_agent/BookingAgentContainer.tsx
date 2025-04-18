import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {getBookingRequestListThunk} from "../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {
    getAcceptSuccess,
    getBookingRequestListSelector, getIsFetching
} from "../../../../_BLL/selectors/booking/bookingAgentSelector";
//components
import Layout from "../../../components/BaseLayout/Layout";
import BookingAgentPage from "./BookingAgentPage";
import MovedToOperationsPopup from "../../../components/PopUps/moved_to_operations_popup/MovedToOperationsPopup";
import ModalWindow from "../../../components/_commonComponents/ModalWindow/ModalWindow";
import SpinnerForAuthorizedPages from "../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";
import {useTranslation} from "react-i18next";


const BookingAgentContainer: React.FC = () => {

    const [mode, setMode] = useState("sea");
    const [directory, setDirectory] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [search_column, setSearchColumn] = useState("");
    const [isSearchMode, setSearchMode] = useState(false);
    const [movedPopup, setMovedPopup] = useState(false)

    const text = "There are no requests at the moment"

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingRequestListThunk(mode, "", "", ""));
    }, [dispatch]);

    const bookingList = useSelector(getBookingRequestListSelector);
    const accept_success = useSelector(getAcceptSuccess)
    const isFetching = useSelector(getIsFetching)

    useEffect(() => {
        if (accept_success) {
            setMovedPopup(true)
        }
    }, [accept_success])
    const {t} = useTranslation();
    return (
        <Layout>
            {isFetching
                ? <SpinnerForAuthorizedPages/>
                : <>
                    {movedPopup && <ModalWindow isOpen={movedPopup}>
                        <MovedToOperationsPopup setMovedToOperations={setMovedPopup}/>
                    </ModalWindow>
                    }
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
                                      text={t(`Bookings/${text}`)}
                    />
                </>}

        </Layout>
    )
}

export default BookingAgentContainer