import React from 'react'
//MATERIAL UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
//types
import {CargoGroupQuoteType} from "../../../../_BLL/types/quotes/quotesTypes";
import {useTranslation} from "react-i18next";


type PropsType = {
    cargos?: CargoGroupQuoteType[]
}

const useStyles = makeStyles({
    container: {
        boxShadow: 'none'
    },
    table: {
        width: 450,
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '14px',
        borderBottom: '0',
        padding: '0 0 5px'
    },
    innerCell: {
        borderBottom: '0',
        fontFamily: 'Helvetica Light',
        fontSize: '14px',
        color: '#1B1B25',
        padding: '0 0 5px'
    }
});

const CargoTable:React.FC<PropsType> = ({cargos}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell} align="left">{t("Bookings/VOLUME")}</TableCell>
                        <TableCell className={classes.cell} align="left">
                            {cargos && cargos[0].container_type ? t('Quote bid screen/CONTAINER TYPE') : t('Bookings/PACKAGING TYPE')}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cargos?.map((c, index) => <TableRow key={index}>
                            <TableCell className={classes.innerCell} component="th" scope="row">
                                {c?.volume}
                            </TableCell>
                            <TableCell className={classes.innerCell} align="left">
                                {c.container_type?.code ?? (`${c.packaging_type?.description} - ${c.total_wm}w/m`)}
                            </TableCell>
                        </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CargoTable