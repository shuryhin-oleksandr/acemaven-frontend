import React, { useState } from "react";
import RatingInfoPopup from "../../../components/PopUps/rating_info_popup/RatingInfoPopup";
import SearchCardsContainer from "./SearchCardsContainer";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";
import {SearchResultType} from "../../../../_BLL/types/search/search_types";

type PropsType = {
  search_result: SearchResultType[],
  shippingValue:number,
  setBookingPopupVisible?:(value:boolean)=>void
  setWidgetsVisible?:(value:boolean)=>void
}

const SearchContainer:React.FC<PropsType> = ({search_result,shippingValue,setBookingPopupVisible,setWidgetsVisible}) => {
  const [isRatingPopup, showRatingPopup] = useState(false);


  return (
    <>

      {isRatingPopup ? (
        <RatingInfoPopup showRatingPopup={showRatingPopup} />
      ) : (
        <SearchCardsContainer showRatingPopup={showRatingPopup}
                              search_result={search_result}
                              shippingValue={shippingValue}
                              setBookingPopupVisible={setBookingPopupVisible}
                              setWidgetsVisible={setWidgetsVisible}
        />
      )}
    </>
  );
};

export default SearchContainer;
