import React, { useState } from "react";
import RatingInfoPopup from "../../../components/PopUps/rating_info_popup/RatingInfoPopup";
import SearchCardsContainer from "./SearchCardsContainer";
import {SearchResultType} from "../../../../_BLL/types/search/search_types";
import {useDispatch} from "react-redux";
import {searchActions} from "../../../../_BLL/reducers/search_client/searchClientReducer";


type PropsType = {
  search_result: SearchResultType[],
  shippingValue:number,
  setBookingPopupVisible?:(value:boolean)=>void
  setWidgetsVisible?:(value:boolean)=>void,
}

const SearchContainer:React.FC<PropsType> = ({search_result,shippingValue,setBookingPopupVisible,setWidgetsVisible}) => {
  const [isRatingPopup, showRatingPopup] = useState(false);
  const [clickedReview, setClickedReview] = useState(0)

  const dispatch = useDispatch()
  const closeReviewPopupHandler = () => {
    showRatingPopup(false)
    dispatch(searchActions.setSearchedCompanyRating(null))
  }

  return (
    <>
      {isRatingPopup ? (
        <RatingInfoPopup clickedReview={clickedReview}
                         closeReviewPopupHandler={closeReviewPopupHandler}
        />
      ) : (
        <SearchCardsContainer showRatingPopup={showRatingPopup}
                              search_result={search_result}
                              shippingValue={shippingValue}
                              setBookingPopupVisible={setBookingPopupVisible}
                              setWidgetsVisible={setWidgetsVisible}
                              setClickedReview={setClickedReview}

        />
      )}
    </>
  );
};

export default SearchContainer;
