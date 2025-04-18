import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    HandlingSurchargeContainer,
    HandlingTitle
} from "../../../../surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useTranslation} from "react-i18next";
import ScrollbarStyled from "../../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";

type PropsType = {
    containers: any
}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        height: 320,
        width: 450
    },
    table: {
        // minWidth: 430,

    },
    body: {
        height: '201px'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '16px',
        backgroundColor: "white",
    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '16px'
    }
});

const HandlingSurchargeTable:React.FC<PropsType> = ({containers}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return(
        <HandlingSurchargeContainer style={{maxWidth: '834px', marginRight: '50px'}}>
            <HandlingTitle>{t("Quote bid screen/HANDLING")}</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <ScrollbarStyled>
                <Table stickyHeader className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>{t("Surcharges/CONTAINER TYPE")}</TableCell>
                            <TableCell className={classes.cell} align="left">{t("Bookings/CURRENCY")}</TableCell>
                            <TableCell className={classes.cell} align="left">{t("Bookings/CHARGE")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {containers?.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell className={classes.innerCell}  component="th" scope="row">
                                    {c.container_type.code}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {c.currency.code}
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    {c.charge}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </ScrollbarStyled>
            </TableContainer>
        </HandlingSurchargeContainer>
    )
}

export default  HandlingSurchargeTable