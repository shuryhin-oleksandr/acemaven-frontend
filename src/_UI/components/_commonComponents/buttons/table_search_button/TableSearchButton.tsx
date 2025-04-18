import React from "react";
//styles
import {SearchButton} from "./table-search-button-style";
//icons
import search_icon from "../../../../assets/icons/rates&services/search_loop.svg";



type PropsType = {
    setSearchMode: (value: boolean) => void,
    setSearchColumn: (value: string) => void,
    column_name: string
}

const TableSearchButton:React.FC<PropsType> = ({setSearchMode, setSearchColumn, column_name}) => {
    const handler = (name: string) => {
        setSearchMode(true)
        // setSearchColumn(name)
    }

    return (
        <SearchButton id={column_name} onClick={() => handler(column_name)}>
            <img src={search_icon} alt=""/>
        </SearchButton>
    )
}

export default TableSearchButton

