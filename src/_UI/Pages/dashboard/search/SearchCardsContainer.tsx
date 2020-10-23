import React from 'react'
import SearchCard from "./search_rate_card/SearchCard";
import {SearchWrapper} from "./search_rate_card/search-card-styles";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";

type PropsType = {
    showRatingPopup: (value: boolean) => void
}

const SearchCardsContainer:React.FC<PropsType> = ({showRatingPopup}) => {

    return (
        <SearchWrapper >
            <ClientBookingPopUp/>
            <SearchCard showRatingPopup={showRatingPopup}/>
        </SearchWrapper>
    )
}

export default SearchCardsContainer

