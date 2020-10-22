import React from 'react'
import SearchCard from "./search_rate_card/SearchCard";


const SearchCardsContainer:React.FC = () => {
    return (
        <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center',
        alignItems: 'center'}}>
            <SearchCard />
        </div>
    )
}

export default SearchCardsContainer