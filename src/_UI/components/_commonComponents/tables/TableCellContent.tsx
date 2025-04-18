import React from "react";
import SearchInput from "../search_input/SearchInput";
import TableSortButton from "../buttons/table_sort_button/TableSortButton";
import TableSearchButton from "../buttons/table_search_button/TableSearchButton";


type PropsType = {
    setSearchValue: (value: any) => void,
    setSearchMode: (value: boolean) => void,
    direction: string,
    type: string,
    column_name: string,
    searchValue: string,
    isSearchMode: boolean,
    title: string,
    searchColumn: string,
    setSearchColumn: (value: string) => void,
    thunkName?: string,
    withoutSearch?:boolean,
    withoutOrdering?:boolean,
    my_operations?:string,
    operation_status?:string,
    dates?: string[]
}

const TableCellContent:React.FC<PropsType> = ({setSearchValue,thunkName, ...props}) => {
    return (
        <div style={{margin: props.isSearchMode ? '0' : '11px 0'}}>
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
                               my_operations={props.my_operations}
                               operation_status={props.operation_status}
                               dates={props.dates}

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
                                         my_operations={props.my_operations}
                                         operation_status={props.operation_status}
                                         dates={props.dates}
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
        </div>

    )
}

export default TableCellContent