import React from "react";
import SearchInput from "../search_input/SearchInput";
import TableSortButton from "../buttons/table_sort_button/TableSortButton";
import TableSearchButton from "../buttons/table_search_button/TableSearchButton";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";


type PropsType = {
    setSearchValue: VoidFunctionType,
    setSearchMode: VoidFunctionType,
    direction: string,
    type: string,
    column_name: string,
    searchValue: string,
    isSearchMode: boolean,
    title: string,
    searchColumn: string,
    setSearchColumn: VoidFunctionType,
    thunkName?: string,
    withoutSearch?:boolean,
    withoutOrdering?:boolean
}

const TableCellContent:React.FC<PropsType> = ({setSearchValue,thunkName, ...props}) => {
    return (
        <>
            {props.isSearchMode && !props.withoutSearch
                ? <SearchInput setSearchValue={setSearchValue}
                               setSearchMode={props.setSearchMode}
                               direction={props.direction}
                               type={props.type}
                               column_name={props.column_name}
                               searchValue={props.searchValue}
                               searchColumn={props.searchColumn}
                               thunkName={thunkName}
                               setSearchColumn={props.setSearchColumn}

                />
                : <div style={{display: 'flex'}}>
                    {props.title}
                    {props.withoutOrdering?
                        null
                        :
                        <TableSortButton column_name={props.column_name}
                                         direction={props.direction}
                                         mode={props.type}
                                         searchValue={props.searchValue}
                                         searchColumn={props.searchColumn}
                                         thunkName={thunkName}
                        />
                    }

                    {props.withoutSearch?
                        null
                        :
                        <TableSearchButton setSearchMode={props.setSearchMode}
                                           setSearchColumn={props.setSearchColumn}
                                           column_name={props.column_name}
                        />
                    }
                </div>
            }
        </>

    )
}

export default TableCellContent