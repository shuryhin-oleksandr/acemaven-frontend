import React from 'react'
import SearchCard from "./search_rate_card/SearchCard";
import {SearchWrapper} from "./search_rate_card/search-card-styles";
import NoSearchResultCard from "./search_rate_card/no_search_card/NoSearchResultCard";
import {SearchResultType} from "../../../../_BLL/types/search/search_types";


type PropsType = {
    showRatingPopup: (value: boolean) => void,
    setBookingPopupVisible:(value: boolean) => void,
    search_result: SearchResultType[]
}

const SearchCardsContainer:React.FC<PropsType> = ({showRatingPopup, setBookingPopupVisible, search_result}) => {

    return (
        <SearchWrapper >
            {search_result.length > 0
                ? search_result.map((s) => <SearchCard showRatingPopup={showRatingPopup}
                                                      setBookingPopupVisible={setBookingPopupVisible}
                                                      search_result={s}
                />
                )
                : <NoSearchResultCard />
            }
        </SearchWrapper>
    )
}

export default SearchCardsContainer

