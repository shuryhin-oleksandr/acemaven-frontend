import React from "react";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
//react-hook-form
import {Controller} from "react-hook-form";
//types
import { UsageFeeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//helpers
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {
    Field,
    HandlingSurchargeContainer,
    HandlingTitle
} from "./sea-conteneraized-cargo-styles";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    container: {
        boxShadow: 'none',
        paddingRight: "12px",
        maxHeight:300
    },
    table: {
        minWidth: 479,

    },
    body: {
        height: '201px'
    },
    cell: {
        color: '#115B86',
        fontFamily: 'Helvetica Bold',
        fontSize: '16px',
        borderBottom: '1px solid #115B86',
        padding: ' 0',
        backgroundColor: "white",

    },
    innerCell: {
        borderBottom: 'none',
        fontFamily: 'Helvetica Light',
        fontSize: '16px',
        color: '#1B1B25',
        padding: '0'
    }
});

type PropsType = {
    setFormMode?: (value: boolean) => void,
    containers: UsageFeeType[] | null,
    control: any,
    errors: any
}

const HandlingSurcharge:React.FC<PropsType> = ({setFormMode, containers,...props}) => {
    const classes = useStyles();
    const {t} = useTranslation();
    return (
        <div style={{width:"100%", borderBottom:"1px solid #BDBDBD"}}>
        <HandlingSurchargeContainer style={{maxWidth: '1000px'}}>
            <HandlingTitle>{t("Surcharges/HANDLING")} ({t("Surcharges/Surcharges")})</HandlingTitle>
            {/*<ScrollbarStyled {...{style: { height: 300 }}}>*/}
                <TableContainer className={classes.container} component={Paper}>
                    <Table stickyHeader className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>{t("Surcharges/CONTAINER TYPE")}</TableCell>
                                <TableCell className={classes.cell} align="left">{t("Bookings/CURRENCY")}</TableCell>
                                <TableCell className={classes.cell} align="left">{t("Bookings/CHARGE")}</TableCell>
                                <TableCell className={classes.cell} align="left">{t("Surcharges/UPDATED BY")}</TableCell>
                                <TableCell className={classes.cell} align="left">{t("Surcharges/ON")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.body}>
                            {containers?.map((fee : any) => (
                                <TableRow key={fee.id}>
                                    <Controller control={props.control}
                                                name={`usage_fees.${fee.id}.container_type`}
                                                defaultValue={fee.container_type.id}
                                                as={
                                                    <TableCell className={classes.innerCell}  component="th" scope="row">
                                                        {fee.container_type.code}
                                                    </TableCell>
                                                }
                                    />
                                    <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                        <Controller control={props.control}
                                                    name={`usage_fees.${fee.id}.currency`}
                                                    defaultValue={fee.currency.id}
                                                   as={
                                                        <SurchargeRateSelect options={currency}
                                                                             placeholder={t('Quote bid screen/CURRENCY')}
                                                                             max_width='80px'
                                                        />
                                                    }
                                        />
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode && setFormMode(true)}>
                                        <Controller control={props.control}
                                                    name={`usage_fees.${fee.id}.charge`}
                                                    defaultValue={fee.charge}
                                                    as={
                                                        <Field type='number'/>
                                                    }
                                        />
                                    </TableCell>
                                    <Controller control={props.control}
                                                defaultValue={fee.updated_by}
                                                name={`usage_fees.${fee.id}.updated_by`}
                                                as={
                                                    <TableCell className={classes.innerCell} align="left">
                                                        {fee.updated_by}
                                                    </TableCell>
                                                }
                                    />
                                   <Controller control={props.control}
                                               defaultValue={fee.date_updated}
                                               name={`usage_fees.${fee.id}.date_updated`}
                                               as={
                                                   <TableCell className={classes.innerCell} align="left">
                                                       {fee.date_updated}
                                                   </TableCell>
                                               }
                                   />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            {/*</ScrollbarStyled>*/}
        </HandlingSurchargeContainer>
        </div>
    )
}

export default HandlingSurcharge