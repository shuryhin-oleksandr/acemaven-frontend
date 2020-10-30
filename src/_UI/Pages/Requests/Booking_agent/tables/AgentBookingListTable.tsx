import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableCellContent from "../../../../components/_commonComponents/tables/TableCellContent";
import TableBody from "@material-ui/core/TableBody";
import ship_surcharge from "../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import {useDispatch} from "react-redux";
import { ModeIcon } from 'src/_UI/Pages/Services&Rates/surcharge/surcharges_page/surcharges-style';

type PropsType = {
    searchValue: string,
    setSearchValue: (value: string) => void,
    directory: string,
    setDirectory: (value: string) => void
    mode: string,
    searchColumn: string,
    setSearchColumn: (value: string) => void
    isSearchMode: boolean,
    setSearchMode: (value: boolean) => void

}

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
    },
    table: {
        "& .MuiTableHead-root": {},
    },
    row: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    shipping_cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid #115B86",
        padding: "0",
        paddingBottom: "15px",
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid #115B86",
        padding: "0",
        paddingBottom: "15px",
        paddingRight: "30px",
    },
    innerMainCell: {
        borderBottom: "1px solid #BDBDBD",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        position: "relative",
        paddingRight: "40px",
        height: "72px",
        width: "50px",
    },
    innerCell: {
        borderBottom: "1px solid #BDBDBD",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        height: "72px",
        padding: "0",
        paddingRight: "30px",
        width: "170px",
    },
    customTooltip: {
        maxWidth: 330,
        height: 60,
        fontFamily: "Helvetica Reg",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px",
    },
});

const AgentBookingListTable:React.FC<PropsType> = ({setSearchValue, directory, setDirectory, isSearchMode, setSearchMode,
                                                       mode, searchValue, searchColumn, setSearchColumn}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.shipping_cell} align="left" />
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent
                                setSearchValue={setSearchValue}
                                setSearchMode={setSearchMode}
                                dispatch={dispatch}
                                direction={directory}
                                type={mode}
                                column_name="ace_id"
                                searchValue={searchValue}
                                isSearchMode={isSearchMode}
                                title="ACE ID"
                                searchColumn={searchColumn}
                                setSearchColumn={setSearchColumn}
                                //thunkName="rates"
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent
                                setSearchValue={setSearchValue}
                                setSearchMode={setSearchMode}
                                dispatch={dispatch}
                                direction={directory}
                                type={mode}
                                column_name="shipping_mode"
                                searchValue={searchValue}
                                isSearchMode={isSearchMode}
                                title="SHIPPING MODE"
                                searchColumn={searchColumn}
                                setSearchColumn={setSearchColumn}
                                //thunkName="rates"
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent
                                setSearchValue={setSearchValue}
                                setSearchMode={setSearchMode}
                                dispatch={dispatch}
                                direction={directory}
                                type={mode}
                                column_name="route"
                                searchValue={searchValue}
                                isSearchMode={isSearchMode}
                                title="ROUTE"
                                searchColumn={searchColumn}
                                setSearchColumn={setSearchColumn}
                                //thunkName="rates"
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent
                                setSearchValue={setSearchValue}
                                setSearchMode={setSearchMode}
                                dispatch={dispatch}
                                direction={directory}
                                type={mode}
                                column_name="client"
                                searchValue={searchValue}
                                isSearchMode={isSearchMode}
                                title="CLIENT"
                                searchColumn={searchColumn}
                                setSearchColumn={setSearchColumn}
                                //thunkName="rates"
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent
                                setSearchValue={setSearchValue}
                                setSearchMode={setSearchMode}
                                dispatch={dispatch}
                                direction={directory}
                                type={mode}
                                column_name="shipment_date"
                                searchValue={searchValue}
                                isSearchMode={isSearchMode}
                                title="SHIPMENT DATE"
                                searchColumn={searchColumn}
                                setSearchColumn={setSearchColumn}
                                //thunkName="rates"
                            />
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                            <TableCellContent
                                setSearchValue={setSearchValue}
                                setSearchMode={setSearchMode}
                                dispatch={dispatch}
                                direction={directory}
                                type={mode}
                                column_name="status"
                                searchValue={searchValue}
                                isSearchMode={isSearchMode}
                                title="STATUS"
                                searchColumn={searchColumn}
                                setSearchColumn={setSearchColumn}
                                //thunkName="rates"
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow className={classes.row}>
                            <TableCell
                                className={classes.innerMainCell}
                                align="left"
                                component="th"
                                scope="row"
                            >
                                <ModeIcon src={plane_surcharge} alt=""/>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <span style={{color: 'black', fontFamily: 'Helvetica Bold', fontSize: '18px'}}>CAAE0081</span>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <span style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '18px'}}>
                                    LCL
                                </span>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <div style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '24px'}}>SSZ</div>
                                <div style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '24px'}}>BCN</div>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                Coca Cola Inc.
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                <div>1-7 March 2020</div>
                                <div>WEEK 5</div>
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                 <span style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '18px', textTransform: 'uppercase'}}>
                                   Booking Request Received
                                </span>
                            </TableCell>
                        </TableRow>
                        <TableRow className={classes.row}>
                        <TableCell
                            className={classes.innerMainCell}
                            align="left"
                            component="th"
                            scope="row"
                        >
                            <ModeIcon src={plane_surcharge} alt=""/>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            <span style={{color: 'black', fontFamily: 'Helvetica Bold', fontSize: '18px'}}>CAAE0081</span>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                                <span style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '18px'}}>
                                    LCL
                                </span>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            <div style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '24px'}}>SSZ</div>
                            <div style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '24px'}}>BCN</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            Coca Cola Inc.
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                            <div>1-7 March 2020</div>
                            <div>WEEK 5</div>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left">
                                 <span style={{color: 'black', fontFamily: 'Helvetica Light', fontSize: '18px', textTransform: 'uppercase'}}>
                                   Booking Request Received
                                </span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AgentBookingListTable