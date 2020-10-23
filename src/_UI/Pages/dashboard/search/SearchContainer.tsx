import React, {useState} from 'react'
import RatingInfoPopup from "../../../components/PopUps/rating_info_popup/RatingInfoPopup";
import SearchCardsContainer from "./SearchCardsContainer";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";


const SearchContainer = () => {
    const [isRatingPopup, showRatingPopup] = useState(false)
    const booking_popup = false

    return (
        <>
            {booking_popup && <ClientBookingPopUp/>}
            { isRatingPopup
                        ? <RatingInfoPopup showRatingPopup={showRatingPopup}/>
                        : <SearchCardsContainer showRatingPopup={showRatingPopup}/>}

        </>
     )
}

export default SearchContainer