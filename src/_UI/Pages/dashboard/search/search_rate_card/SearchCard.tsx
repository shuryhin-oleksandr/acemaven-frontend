import React from 'react'
import {
    CardContainer, CardInner, HiddenTable,HiddenTitle, HiddenWrapper,} from "./search-card-styles";
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
        padding: "16px 0",
    },
    innerMainCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        color: "#115B86",
        width: "213px",
    },
    innerCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        padding: "8px 0 0",
    }
});

const SearchCard:React.FC = () => {
    const classes = useStyles();

    return (
        <CardContainer>
            <CardInner>
                <BookingCard button_display={true}/>
                <HiddenWrapper>
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
                                        <TableCell className={classes.cell} align="left">
                                           COST
                                        </TableCell>
                                        <TableCell className={classes.cell} align="left">
                                           SUBTOTAL
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow className={classes.info_row}>
                                            <TableCell className={classes.innerCell} component="th" scope="row">
                                                               1
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left" >
                                                40GH
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                               FREIGHT
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                USD
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                 1000
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                3000.00
                                            </TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </HiddenTable>
                </HiddenWrapper>
            </CardInner>
        </CardContainer>
    )
}

export default SearchCard