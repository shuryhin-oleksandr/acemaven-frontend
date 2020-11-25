import React from 'react'
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
//components
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import OperationsRow from "./OperationsRow";
import {OperationType} from "../../../../../_BLL/types/operations/operationsTypes";

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        height: 400,
        overflowY: 'scroll'
    },
    shipping_cell: {
        width: '220px',
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #828282',
        paddingLeft: '63px',
        padding: '0'

    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #828282',
        width: '150px',
        padding: '0'
    },
    innerMainCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        width: '220px',
        color: '#1B1B25',
        position: 'relative',
        paddingLeft: '63px',
        height: '72px'
    },
    innerCell: {
        borderBottom: '1px solid #BDBDBD',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        height: '72px',
        padding: '0',
    },
    customTooltip: {
        maxWidth: 330,
        height: 60,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px'
    },
});

type PropsType = {
    setSearchMode: (value: boolean) => void
    isSearchMode: boolean
    mode: string
    setMode: (value: string) => void
    searchValue: string
    setSearchValue: (value: string) => void
    search_column: string
    setSearchColumn: (value: string) => void,
    operations_list: OperationType[]
}

const AgentOperationTable:React.FC<PropsType> = ({...props}) => {

    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.shipping_cell} align="left">
                            <TableCellContent setSearchValue={props.setSearchValue}
                                              setSearchMode={props.setSearchMode}
                                              direction={''}
                                              type={props.mode}
                                              column_name='id'
                                              searchValue={props.searchValue}
                                              isSearchMode={props.isSearchMode}
                                              title="IDs"
                                              searchColumn={props.search_column}
                                              setSearchColumn={props.setSearchColumn}
                                              //thunkName='quotes'
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent setSearchValue={props.setSearchValue}
                                              setSearchMode={props.setSearchMode}
                                              direction={''}
                                              type={props.mode}
                                              column_name='route'
                                              searchValue={props.searchValue}
                                              isSearchMode={props.isSearchMode}
                                              title='ROUTE'
                                              searchColumn={props.search_column}
                                              setSearchColumn={props.setSearchColumn}
                                              //thunkName='quotes'
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            VOLUME
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent setSearchValue={props.setSearchValue}
                                              setSearchMode={props.setSearchMode}
                                              direction={''}
                                              type={props.mode}
                                              column_name='date_from'
                                              searchValue={props.searchValue}
                                              isSearchMode={props.isSearchMode}
                                              title='DATES'
                                              searchColumn={props.search_column}
                                              setSearchColumn={props.setSearchColumn}
                                //thunkName='quotes'
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent setSearchValue={props.setSearchValue}
                                              setSearchMode={props.setSearchMode}
                                              direction={''}
                                              type={props.mode}
                                              column_name='carrier'
                                              searchValue={props.searchValue}
                                              isSearchMode={props.isSearchMode}
                                              title='CARRIER'
                                              searchColumn={props.search_column}
                                              setSearchColumn={props.setSearchColumn}
                                //thunkName='quotes'
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            STATUS
                        </TableCell>
                        <TableCell className={classes.cell} align="right">
                        <TableCellContent setSearchValue={props.setSearchValue}
                                          setSearchMode={props.setSearchMode}
                                          direction={''}
                                          type={props.mode}
                                          column_name='agent'
                                          searchValue={props.searchValue}
                                          isSearchMode={props.isSearchMode}
                                          title='AGENT'
                                          searchColumn={props.search_column}
                                          setSearchColumn={props.setSearchColumn}
                                          withoutSearch={true}
                            //thunkName='quotes'
                        />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.operations_list.map((operation, index) => <OperationsRow key={index} operation={operation}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AgentOperationTable