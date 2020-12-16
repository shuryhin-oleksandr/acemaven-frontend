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
import TableCellContent from "../../../../../components/_commonComponents/tables/TableCellContent";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {ModeIcon, SpanMode} from "../../../../Services&Rates/surcharge/surcharges_page/surcharges-style";
//icons
import sea_type from "../../../../../assets/icons/rates&services/ship-surcharge.svg";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: "12px",
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
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        '&:hover': {
            transition: '.3s',
            cursor: 'pointer'
        }
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
    }
});

type PropsType = {
    searchValue: string,
    setSearchValue: (value: string) => void,
    setSearchMode: (value: boolean) => void,
    isSearchMode: boolean,
    mode: string,
    search_column: string,
    setSearchColumn: (value: string) => void
}

const BillingInProgressTable:React.FC<PropsType> = ({...props}) => {
    const classes = useStyles();

    return (
        <ScrollbarStyled {...{style: {width: "100%", height: 420}}}>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.shipping_cell} align="left">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={props.setSearchMode}
                                                  direction={''}
                                                  type={props.mode}
                                                  column_name='aceid'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={props.isSearchMode}
                                                  title='ID'
                                                  searchColumn={props.search_column}
                                                  setSearchColumn={props.setSearchColumn}
                                                  thunkName='#'
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
                                                  thunkName='#'
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                MODE
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                CHARGES (BRL)
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                CHARGES (USD)
                            </TableCell>
                            <TableCell className={classes.cell} align="right">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={props.setSearchMode}
                                                  direction={''}
                                                  type={props.mode}
                                                  column_name='payment_due_by'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={props.isSearchMode}
                                                  title='PAY DUE'
                                                  searchColumn={props.search_column}
                                                  setSearchColumn={props.setSearchColumn}
                                                  thunkName='#'
                                                  withoutSearch={true}
                                />
                            </TableCell>
                            <TableCell className={classes.cell} align="right">
                                <TableCellContent setSearchValue={props.setSearchValue}
                                                  setSearchMode={props.setSearchMode}
                                                  direction={''}
                                                  type={props.mode}
                                                  column_name='status'
                                                  searchValue={props.searchValue}
                                                  isSearchMode={props.isSearchMode}
                                                  title='STATUS'
                                                  searchColumn={props.search_column}
                                                  setSearchColumn={props.setSearchColumn}
                                                  thunkName='#'
                                                  withoutSearch={true}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={classes.root} onClick={() => {}}>
                            <TableCell className={classes.innerMainCell} align="left" component="th"
                                       scope="row">
                                <ModeIcon src={sea_type} alt=""/>
                                <SpanMode>!!ACEID</SpanMode>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <div>RYUIO</div>
                                <div>HUIOD</div>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                FCL
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                8.020.00
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                7200.00
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                10 MAY 2020
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                10/11 13:02 PM
                                Cargo was registered at the termimal
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </ScrollbarStyled>
    )
}

export default BillingInProgressTable