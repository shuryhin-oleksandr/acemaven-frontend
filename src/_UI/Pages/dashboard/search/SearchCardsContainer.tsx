import React from 'react'
import SearchCard from "./search_rate_card/SearchCard";
import {SearchWrapper} from "./search_rate_card/search-card-styles";
import SearchWidget from "../Widgets/SearchWidget/SearchWidget";
import NoSearchResultCard from "./search_rate_card/no_search_card/NoSearchResultCard";


type PropsType = {
    showRatingPopup: (value: boolean) => void
}

const SearchCardsContainer:React.FC<PropsType> = ({showRatingPopup}) => {
    return (
        <SearchWrapper >
            <SearchWidget bottom='35px'/>
            <SearchCard showRatingPopup={showRatingPopup}/>
            {/*<NoSearchResultCard />*/}
        </SearchWrapper>
    )
}

export default SearchCardsContainer

