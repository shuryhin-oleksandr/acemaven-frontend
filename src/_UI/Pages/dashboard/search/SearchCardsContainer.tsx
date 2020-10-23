import React from 'react'
import SearchCard from "./search_rate_card/SearchCard";
import ClientBookingPopUp from "../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";


const SearchCardsContainer:React.FC = () => {
    return (
        <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center',
        alignItems: 'center'}}>
            <ClientBookingPopUp/>
            <SearchCard />
        </div>
    )
}

export default SearchCardsContainer