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
    setBookingPopupVisible:(value: boolean) => void
}

const SearchCard:React.FC<PropsType> = ({showRatingPopup,setBookingPopupVisible}) => {
    const classes = useStyles();

    const [isShown, setShow] = useState(false)

    return (
        <CardContainer>
            <CardInner>
                <BookingCard showRatingPopup={showRatingPopup} showTable={setShow} isTableShown={isShown} button_display={true} setBookingPopupVisible={setBookingPopupVisible}/>
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
                                    <TableRow className={classes.info_row}>
                                        <TableCell className={classes.innerCell} scope="row">
                                            1
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left" >
                                            40GH
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div>FREIGHT</div>
                                            <div>HANDING</div>
                                            <div>OTHERS</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div>USD</div>
                                            <div>BRL</div>
                                            <div>USD</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            <div>1000</div>
                                            <div>500</div>
                                            <div>599</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            <div>1000.00</div>
                                            <div>500.6</div>
                                            <div>599.68</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.info_row}>
                                        <TableCell className={classes.innerCell} scope="row">
                                            1
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left" >
                                            40GH
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div>FREIGHT</div>
                                            <div>HANDING</div>
                                            <div>OTHERS</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div>USD</div>
                                            <div>BRL</div>
                                            <div>USD</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            <div>1000</div>
                                            <div>500</div>
                                            <div>599</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            <div>1000.00</div>
                                            <div>500.6</div>
                                            <div>599.68</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.info_row}>
                                        <TableCell className={classes.innerCell} scope="row">
                                            1
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left" >
                                            40GH
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div>FREIGHT</div>
                                            <div>HANDING</div>
                                            <div>OTHERS</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <div>USD</div>
                                            <div>BRL</div>
                                            <div>USD</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            <div>1000</div>
                                            <div>500</div>
                                            <div>599</div>
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            <div>1000.00</div>
                                            <div>500.6</div>
                                            <div>599.68</div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.info_row}>
                                        <TableCell className={classes.innerCell} scope="row">
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left" >
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            DOC FEE
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            BRL
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            700
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="right">
                                            50.00
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </HiddenTable>
                    <TableTotal>
                        <TotalLine>
                            <TotalName>TOTAL FREIGHT</TotalName>
                            <TotalValue>8.802</TotalValue>
                        </TotalLine>
                        <TotalLine>
                            <TotalName>CHARGES IN BRL</TotalName>
                            <TotalValue>3000</TotalValue>
                        </TotalLine>
                        <TotalLine>
                            <TotalName>CHARGES IN BRL</TotalName>
                            <TotalValue>100</TotalValue>
                        </TotalLine>
                        <TotalLine>
                            <TotalName>ACEMAVEN SERVICE FEE: IN BRL</TotalName>
                            <TotalValue>50</TotalValue>
                        </TotalLine>
                    </TableTotal>
                </HiddenWrapper>}
            </CardInner>
        </CardContainer>
    )
}

export default SearchCard