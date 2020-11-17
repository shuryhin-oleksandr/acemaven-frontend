import React, {useState} from 'react'
import {
    CardContainer, CardInner, HiddenTable, HiddenTitle, HiddenWrapper, TableTotal, TotalLine, TotalName, TotalValue,
} from "./search-card-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import BookingCard from "./BookingCard";
import {SearchResultType} from "../../../../../_BLL/types/search/search_types";
import ClientBookingPopUp from "../../../../components/PopUps/ClientBookingPopUp/ClientBookingPopUp";

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
    },
    table: {
        "& .MuiTableHead-root": {},
    },
    info_row: {
        '&:hover' : {
            cursor: 'pointer'
        }
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid white",
        padding: "16px 0 0",
    },
    innerMainCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        color: "#115B86",

    },
    innerCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        padding: "8px 0 0",
    }
});

type PropsType = {
    showRatingPopup: (value: boolean) => void
    search_result: SearchResultType
    shippingValue:number
}

const SearchCard:React.FC<PropsType> = ({showRatingPopup, search_result,shippingValue}) => {
    const classes = useStyles();

    const [isShown, setShow] = useState(false)
    const [bookingPopupVisible, setBookingPopupVisible] = useState(false);
    return (
        <CardContainer>
            {bookingPopupVisible && <ClientBookingPopUp shippingValue={shippingValue} setBookingPopupVisible={setBookingPopupVisible} currentFreightRate={search_result} />}
            <CardInner>
                <BookingCard showRatingPopup={showRatingPopup}
                             showTable={setShow}
                             isTableShown={isShown}
                             button_display={true}
                             setBookingPopupVisible={setBookingPopupVisible}
                             search_result={search_result}
                />
                {isShown && <HiddenWrapper>
                    <HiddenTitle>
                        CHARGES
                    </HiddenTitle>
                    <HiddenTable>
                        <TableContainer className={classes.container} component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.cell}>
                                            VOLUME
                                        </TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            TYPE
                                        </TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            CHARGE
                                        </TableCell>
                                        <TableCell className={classes.cell} align="left">
                                            CURRENCY
                                        </TableCell>
                                        <TableCell className={classes.cell} align="right">
                                            COST
                                        </TableCell>
                                        <TableCell className={classes.cell} align="right">
                                            SUBTOTAL
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {search_result.cargo_groups.map(s =>
                                        <TableRow key={s.cargo_type} className={classes.info_row}>
                                            <TableCell className={classes.innerCell} scope="row">
                                                {s.volume}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left" >
                                                {s.cargo_type}
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                <div>FREIGHT</div>
                                                <div>HANDLING</div>
                                                <div>OTHERS</div>
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                <div>{s.freight.currency}</div>
                                                <div>{s.handling.currency}</div>
                                                <div>{s.other.currency}</div>
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="right">
                                                <div>{s.freight.cost}</div>
                                                <div>{s.handling.cost}</div>
                                                <div>{s.other.cost}</div>
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="right">
                                                <div>{s.freight.subtotal}</div>
                                                <div>{s.handling.subtotal}</div>
                                                <div>{s.other.subtotal}</div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow className={classes.info_row}>
                                        <TableCell className={classes.innerCell} scope="row">
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left" >
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            DOC FEE
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            {search_result.doc_fee.currency}
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            {search_result.doc_fee.cost}
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            {search_result.doc_fee.subtotal}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </HiddenTable>
                    <TableTotal>
                        <TotalLine>
                            <TotalName>
                                TOTAL FREIGHT IN {search_result?.total_freight_rate.USD
                                    ? "BRL"
                                    : "USD" }
                            </TotalName>
                            <TotalValue>
                                {search_result.total_freight_rate.USD
                                    ? search_result.total_freight_rate.USD
                                    : search_result.total_freight_rate.BRL}
                            </TotalValue>
                        </TotalLine>
                        <TotalLine>
                            <TotalName>
                                CHARGES IN {search_result?.total_surcharge.BRL
                                    ? "BRL"
                                    : "USD"
                                }
                            </TotalName>
                            <TotalValue>
                                {search_result.total_surcharge.BRL
                                    ? search_result.total_surcharge.BRL
                                    : search_result.total_surcharge.USD
                                }
                            </TotalValue>
                        </TotalLine>
                        <TotalLine>
                            <TotalName>ACEMAVEN SERVICE FEE: IN {search_result.service_fee.currency}</TotalName>
                            <TotalValue>{search_result.service_fee.cost}</TotalValue>
                        </TotalLine>
                    </TableTotal>
                </HiddenWrapper>}
            </CardInner>
        </CardContainer>
    )
}

export default SearchCard