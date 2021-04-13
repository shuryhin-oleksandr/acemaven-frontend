import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    HiddenTable,
    HiddenWrapper,
    TableTotal, TotalLine, TotalName, TotalValue
} from "../../../../../dashboard/search/search_rate_card/search-card-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {SectionTitle} from "../../../../../operations/agent/ExactOperationContainer/OperationCard/operation-card-style";
import {InfoRowLabel, InfoRowValue} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
import {ChargeCalculationType} from "../../../../../../../_BLL/types/quotes/quotesTypes";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
    },
    table: {
        "& .MuiTableHead-root": {},
    },
    info_row: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid #115B86",
        borderTop: "1px solid #115B86",
        padding: "10px 0 10px",
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
    charges: ChargeCalculationType | null,
    payment_due_by: string | null
}

const ChargesToPay: React.FC<PropsType> = ({charges, payment_due_by}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const column_object = [
        {name: t('Bookings/VOLUME'), align: 'left'},
        {name: t('Bookings/TYPE'), align: 'left'},
        {name: t('Bookings/CHARGE'), align: 'left'},
        {name: t('Bookings/CURRENCY'), align: 'left'},
        {name: t('Bookings/COST'), align: 'right'},
        {name: t('Bookings/SUBTOTAL'), align: 'right'},
    ]

    let no_of_docs = charges?.doc_fee && (charges?.doc_fee?.subtotal/charges?.doc_fee?.cost)

    return (
        <>
            <SectionTitle margin_bottom='17px'>{t("Bookings/CHARGES")}</SectionTitle>
            {payment_due_by &&
            <div style={{display: 'flex'}}>
                <InfoRowLabel style={{marginRight: '10px'}}>{t("Operations/PAYMENT DUE BY:")}</InfoRowLabel>
                <InfoRowValue>{payment_due_by}</InfoRowValue>
            </div>
            }
            <HiddenWrapper margin_top={'30px'}>
                <HiddenTable>
                    <TableContainer className={classes.container} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {column_object.map((c: any, index: number) => <TableCell key={index}
                                                                                             className={classes.cell}
                                                                                             align={c.align}>
                                        {c.name}
                                    </TableCell>)}
                                </TableRow>
                            </TableHead>
                             <TableBody>
                            {charges?.cargo_groups?.map(s =>
                                <TableRow key={s.cargo_type} className={classes.info_row}>
                                    <TableCell className={classes.innerCell} scope="row">
                                        {s.volume}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left" >
                                        {s.cargo_type}
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                        <div>{t("Quote bid screen/FREIGHT")}</div>
                                        <div>{t("Quote bid screen/HANDLING")}</div>
                                        <div>{t("Quote bid screen/OTHERS")}</div>
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
                                    {no_of_docs}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" >
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {t("Surcharges/DOCUMENT FEE")}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {charges?.doc_fee?.currency}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="right">
                                    {charges?.doc_fee?.cost}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="right">
                                    {charges?.doc_fee?.subtotal}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                </HiddenTable>
                 <TableTotal>
                <TotalLine>
                    <TotalName>
                        {t("Surcharges/TOTAL FREIGHT IN")} {charges?.total_freight_rate?.USD
                        ? "BRL"
                        : "USD" }
                    </TotalName>
                    <TotalValue>
                        {charges?.total_freight_rate?.USD
                            ? charges?.total_freight_rate?.USD
                            : charges?.total_freight_rate?.BRL}
                    </TotalValue>
                </TotalLine>
                <TotalLine>
                    <TotalName>
                        {t("Bookings/CHARGES IN")} {charges?.total_surcharge?.BRL
                        ? "BRL"
                        : "USD"
                    }
                    </TotalName>
                    <TotalValue>
                        {charges?.total_surcharge?.BRL
                            ? charges?.total_surcharge?.BRL
                            : charges?.total_surcharge?.USD
                        }
                    </TotalValue>
                </TotalLine>
            </TableTotal>
            </HiddenWrapper>
        </>

    )
}

export default ChargesToPay

