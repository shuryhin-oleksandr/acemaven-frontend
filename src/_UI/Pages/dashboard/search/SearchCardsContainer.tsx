import React from 'react'
import SearchCard from "./search_rate_card/SearchCard";
import {SearchWrapper} from "./search_rate_card/search-card-styles";
import {SearchResultType} from "../../../../_BLL/types/search/search_types";


type PropsType = {
    showRatingPopup: (value: boolean) => void,
    search_result: SearchResultType[],
    shippingValue:number,
    setBookingPopupVisible?:(value:boolean)=>void
    setWidgetsVisible?:(value:boolean)=>void
}

const SearchCardsContainer:React.FC<PropsType> = ({showRatingPopup, search_result,shippingValue,setBookingPopupVisible,setWidgetsVisible}) => {

    return (
        <SearchWrapper >
            {search_result.length > 0
                ? search_result.map((s) => <SearchCard showRatingPopup={showRatingPopup}   shippingValue={shippingValue}

                                                      search_result={s} setBookingPopupVisible={setBookingPopupVisible} setWidgetsVisible={setWidgetsVisible}
                />
                )
                : null
            }
        </SearchWrapper>
    )
}

export default SearchCardsContainer

