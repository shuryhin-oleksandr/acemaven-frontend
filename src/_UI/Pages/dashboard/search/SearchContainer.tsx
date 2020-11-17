import React, { useState } from "react";
import RatingInfoPopup from "../../../components/PopUps/rating_info_popup/RatingInfoPopup";
import SearchCardsContainer from "./SearchCardsContainer";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";
import {SearchResultType} from "../../../../_BLL/types/search/search_types";

type PropsType = {
  search_result: SearchResultType[],
  shippingValue:number
}

const SearchContainer:React.FC<PropsType> = ({search_result,shippingValue}) => {
  const [isRatingPopup, showRatingPopup] = useState(false);


  return (
    <>

      {isRatingPopup ? (
        <RatingInfoPopup showRatingPopup={showRatingPopup} />
      ) : (
        <SearchCardsContainer showRatingPopup={showRatingPopup}
                              search_result={search_result}
                              shippingValue={shippingValue}
        />
      )}
    </>
  );
};

export default SearchContainer;
