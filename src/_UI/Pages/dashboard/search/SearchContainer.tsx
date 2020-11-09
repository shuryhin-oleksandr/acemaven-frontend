import React, { useState } from "react";
import RatingInfoPopup from "../../../components/PopUps/rating_info_popup/RatingInfoPopup";
import SearchCardsContainer from "./SearchCardsContainer";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";
import {SearchResultType} from "../../../../_BLL/types/search/search_types";

type PropsType = {
  search_result: SearchResultType[]
}

const SearchContainer:React.FC<PropsType> = ({search_result}) => {
  const [isRatingPopup, showRatingPopup] = useState(false);
  const [bookingPopupVisible, setBookingPopupVisible] = useState(false);

  return (
    <>
      {bookingPopupVisible && <ClientBookingPopUp setBookingPopupVisible={setBookingPopupVisible} />}
      {isRatingPopup ? (
        <RatingInfoPopup showRatingPopup={showRatingPopup} />
      ) : (
        <SearchCardsContainer showRatingPopup={showRatingPopup}
                              setBookingPopupVisible={setBookingPopupVisible}
                              search_result={search_result}
        />
      )}
    </>
  );
};

export default SearchContainer;
