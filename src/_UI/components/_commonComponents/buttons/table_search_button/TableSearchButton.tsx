import React from "react";
import search_icon from "../../../../assets/icons/rates&services/search_loop.svg";
import {SearchButton} from "./table-search-button-style";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";


type PropsType = {
    setSearchMode: VoidFunctionType,
    setSearchColumn: VoidFunctionType,
    column_name: string
}

const TableSearchButton:React.FC<PropsType> = ({setSearchMode, setSearchColumn, column_name}) => {
    const handler = (name: string) => {
        setSearchMode(true)
        setSearchColumn(name)
    }

    return (
        <SearchButton id={column_name} onClick={() => handler(column_name)}>
            <img src={search_icon} alt=""/>
        </SearchButton>
    )
}

export default TableSearchButton

