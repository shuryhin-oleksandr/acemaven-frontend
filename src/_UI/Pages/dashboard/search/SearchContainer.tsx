import React, { useState } from "react";
import RatingInfoPopup from "../../../components/PopUps/rating_info_popup/RatingInfoPopup";
import SearchCardsContainer from "./SearchCardsContainer";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";

const SearchContainer = () => {
  const [isRatingPopup, showRatingPopup] = useState(false);
  const [bookingPopupVisible, setBookingPopupVisible] = useState(false);

  return (
    <>
      {bookingPopupVisible && <ClientBookingPopUp setBookingPopupVisible={setBookingPopupVisible} />}
      {isRatingPopup ? (
        <RatingInfoPopup showRatingPopup={showRatingPopup} />
      ) : (
        <SearchCardsContainer showRatingPopup={showRatingPopup} setBookingPopupVisible={setBookingPopupVisible} />
      )}
    </>
  );
};

export default SearchContainer;
