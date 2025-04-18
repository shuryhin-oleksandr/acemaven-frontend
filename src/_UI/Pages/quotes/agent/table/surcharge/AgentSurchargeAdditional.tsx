import React from 'react'
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//types
import {ChargesType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//components
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import {useTranslation} from "react-i18next";

type PropsType = {
    charges:  ChargesType[]
}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: 12
    },
    table: {
        '& .MuiTableHead-root' : {

        }
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: '14px 0'
    },
    innerMainCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '16px 0',
        width: 200
    },
    innerCell: {
        borderBottom: '1px solid #E0E0E0;',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        padding: '16px 0'
    }
});

const AgentSurchargeAdditional:React.FC<PropsType> = ({charges}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
      <ScrollbarStyled {...{style: { width: 800, height: 620}}}>
        <TableContainer className={classes.container} component={Paper} style={{marginLeft: '20px'}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left" />
                        <TableCell className={classes.cell} align="left">{t("Quote bid screen/CURRENCY")}</TableCell>
                        <TableCell className={classes.cell} align="left">{t("Quote bid screen/CHARGE")}</TableCell>
                        <TableCell className={classes.cell} align="left">{t("Quote bid screen/CONDITION")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charges.map((charge, index) => <TableRow key={index}>
                        <TableCell className={classes.innerMainCell}  component="th" scope="row">
                            <span style={{fontFamily: 'Helvetica Bold', fontSize:'16px', color: '#115b86'}}>
                                {charge.additional_surcharge.title}
                            </span>
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            {charge.currency.code}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            {charge.charge}
                        </TableCell>
                        <TableCell className={classes.innerCell} align="left" >
                            {charge.conditions}
                        </TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
      </ScrollbarStyled>
    )
}

export default AgentSurchargeAdditional