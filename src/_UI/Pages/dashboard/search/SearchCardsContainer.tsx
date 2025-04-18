import React from 'react'
//types
import {SearchResultType} from "../../../../_BLL/types/search/search_types";
//components
import SearchCard from "./search_rate_card/SearchCard";
//styles
import {SearchWrapper} from "./search_rate_card/search-card-styles";


type PropsType = {
    showRatingPopup: (value: boolean) => void,
    search_result: SearchResultType[],
    shippingValue:number,
    setBookingPopupVisible?:(value:boolean)=>void
    setWidgetsVisible?:(value:boolean)=>void,
    setClickedReview: (value: number) => void
}

const SearchCardsContainer:React.FC<PropsType> = ({showRatingPopup, search_result,shippingValue,setBookingPopupVisible,setWidgetsVisible, ...props}) => {

    return (
        <SearchWrapper >
            {search_result.length > 0
                ? search_result.map((s) => <SearchCard showRatingPopup={showRatingPopup}
                                                       shippingValue={shippingValue}
                                                       search_result={s}
                                                       setBookingPopupVisible={setBookingPopupVisible}
                                                       setWidgetsVisible={setWidgetsVisible}
                                                       setClickedReview={props.setClickedReview}
                />
                )
                : null
            }
        </SearchWrapper>
    )
}

export default SearchCardsContainer

