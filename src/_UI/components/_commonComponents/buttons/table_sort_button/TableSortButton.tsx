import React from "react";
import sort_arrows from "../../../../assets/icons/rates&services/sort_arrows.svg";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {filterByThunk} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {SortButton} from "./table-sort-button-style";


type PropsType = {
    column_name: string,
    dispatch: VoidFunctionType,
    direction: string,
    mode: string,
    searchValue: string,
    searchColumn: string,
}

const TableSortButton:React.FC<PropsType> = ({column_name, dispatch, direction, mode, ...props}) => {
    return (
        <SortButton onClick={() => dispatch(filterByThunk(direction, mode, column_name, props.searchColumn, props.searchValue))}>
            <img src={sort_arrows} alt=""/>
        </SortButton>
    )
}

export default TableSortButton