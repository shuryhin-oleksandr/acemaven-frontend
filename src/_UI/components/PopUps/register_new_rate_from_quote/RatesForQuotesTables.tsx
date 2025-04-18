import React from 'react'
//react-hook-form
import {Controller} from "react-hook-form";
//material ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//components
import SurchargeRateSelect from "../../_commonComponents/select/SurchargeRateSelect";
import ScrollbarStyled from "../../_commonComponents/ScrollbarStyled/ScrollbarStyled";
//types & helpers
import {ContainerType} from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import {ShippingModeEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {currency} from "../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//styles
import {Field} from "../../_commonComponents/Input/input-styles";
import {HandlingTitle} from "../../../Pages/Services&Rates/surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        paddingRight: 12,
        maxWidth: '440px',
        maxHeight: '270px'
    },
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cell: {
        color: "#115B86",
        fontFamily: "Helvetica Bold",
        fontSize: "16px",
        borderBottom: "1px solid #115B86",
        padding: '16px 0',
        backgroundColor: "white",
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
    },
});

type PropsType = {
    usageFees: ContainerType[];
    quote_shipping_mode_id: number,
    control: any,
    register: any,
    setValue: any
}

const RatesForQuotesTable: React.FC<PropsType> = ({usageFees, quote_shipping_mode_id, ...props}) => {

    const classes = useStyles()

    const {t} = useTranslation();
    return (
        <div style={{width: '100%', paddingBottom: '40px', borderBottom: '1px solid #bdbdbd', marginBottom: '20px'}}>
            <HandlingTitle margin_bottom='0px'>{t("Freight rates/FREIGHT RATE")}</HandlingTitle>
            {/*<ScrollbarStyled {...{*/}
            {/*    style: {width: 440},*/}
            {/*    autoHeight: true,*/}
            {/*    autoHeightMin: 120,*/}
            {/*    autoHeightMax: 270*/}
            {/*}}*/}
            {/*>*/}
                <TableContainer className={classes.container} component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {usageFees?.length > 0 && quote_shipping_mode_id !== ShippingModeEnum.ULD
                                && <TableCell className={classes.cell}>
                                    {t("Quote bid screen/CONTAINER TYPE")}
                                </TableCell>
                                }
                                <TableCell className={classes.cell} align="left">
                                    {t("Quote bid screen/CURRENCY")}
                                </TableCell>
                                {usageFees?.length > 0 && quote_shipping_mode_id !== ShippingModeEnum.ULD
                                    ? (<TableCell className={classes.cell} align="left">
                                      {t("Quote bid screen/RATE")}
                                    </TableCell>)
                                    : (<TableCell className={classes.cell} align="left">
                                      {t("Quote bid screen/RATE PER W/M")}
                                    </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usageFees.length > 0 && quote_shipping_mode_id !== ShippingModeEnum.ULD
                                ? usageFees.map(fee => (
                                    <TableRow key={fee.id}>
                                        <Controller control={props.control}
                                                    defaultValue={fee.id}
                                                    name={`rates.${fee.id}.container_type`}
                                                    as={
                                                        <TableCell
                                                            className={classes.innerCell}
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {fee.code}
                                                        </TableCell>
                                                    }
                                        />
                                        <TableCell className={classes.innerCell} align="left">
                                            <Controller control={props.control}
                                                        name={`rates.${fee.id}.currency`}
                                                        defaultValue={currency[0].id}
                                                        as={
                                                            <SurchargeRateSelect options={currency}
                                                                                 max_width='80px'
                                                                                 placeholder={t('Bookings/Currency')}
                                                            />
                                                        }
                                            />
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                            <Field placeholder='0.00'
                                                   max_width='100px'
                                                   name={`rates.${fee.id}.rate`}
                                                   ref={props.register({required: true})}
                                                   type='number'
                                                   step='0.001'
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                                : <>
                                    <TableRow>
                                        <>
                                            <TableCell className={classes.innerCell} align="left">
                                                <Controller control={props.control}
                                                            name={`rates.currency`}
                                                            defaultValue={currency[0].id}
                                                            as={
                                                                <SurchargeRateSelect options={currency}
                                                                                     max_width='80px'
                                                                />
                                                            }
                                                />
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                <Field placeholder='0.00'
                                                       max_width='100px'
                                                       name={`rates.rate`}
                                                       ref={props.register({required: true})}
                                                       type='number'
                                                       step='0.001'
                                                />
                                            </TableCell>
                                        </>
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            {/*</ScrollbarStyled>*/}
        </div>
    )
}

export default RatesForQuotesTable