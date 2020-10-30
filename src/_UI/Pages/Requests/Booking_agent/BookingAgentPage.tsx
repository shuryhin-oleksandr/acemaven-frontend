import React, {useState} from 'react'
import {BookingContent, BookingWrapper, ContentHeader, ContentTable, ContentTitle } from './booking-agent-styles'
import OptionsDeliveryButtons
    from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import AgentBookingListTable from "./tables/AgentBookingListTable";

type PropsType = {

}

const BookingAgentPage:React.FC<PropsType> = ({}) => {

    const [mode, setMode] = useState("sea");
    const [directory, setDirectory] = useState("import");
    const [searchValue, setSearchValue] = useState("");
    const [search_column, setSearchColumn] = useState("");

    const [isSearchMode, setSearchMode] = useState(false);

    return (
        <BookingWrapper>
            <BookingContent>
                <ContentHeader>
                    <ContentTitle>Bookings</ContentTitle>
                    <OptionsDeliveryButtons  directory={directory}
                                             mode={mode}
                                             setMode={setMode}
                                             searchColumn={search_column}
                                             searchValue={searchValue}
                    />
                </ContentHeader>
                <ContentTable>
                    <AgentBookingListTable mode={mode}
                                           searchValue={searchValue}
                                           setSearchValue={setSearchValue}
                                           searchColumn={search_column}
                                           setSearchColumn={setSearchColumn}
                                           directory={directory}
                                           setDirectory={setDirectory}
                                           isSearchMode={isSearchMode}
                                           setSearchMode={setSearchMode}
                    />
                </ContentTable>
            </BookingContent>
        </BookingWrapper>
    )
}

export default BookingAgentPage