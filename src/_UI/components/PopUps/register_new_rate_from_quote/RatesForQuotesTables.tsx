import React, {useState} from 'react'
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
import {SpanAware, Title} from "../../../Pages/Services&Rates/rates/register_new_freight_rate/tables/Rates";
//types & helpers
import {ContainerType} from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import {ShippingModeEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {currency} from "../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//styles
import {Field } from "../../_commonComponents/Input/input-styles";
import {HandlingTitle} from "../../../Pages/Services&Rates/surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        width: 440,
        minHeight: 120,
        maxHeight: 270,
        overflowY: 'scroll'

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
        padding: '16px 0'
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

const RatesForQuotesTable:React.FC<PropsType> = ({usageFees, quote_shipping_mode_id, ...props}) => {

    const classes = useStyles()


    const [awareMessage, setAware] = useState(false)
    const [rate_value, setRateValue] = useState('')
    let onChange = (e: any, id: string) => {
        if(e.currentTarget.value === '0') {
            setRateValue(id)
            setAware(true)
            props.setValue(`rates.${id}.rate`, e.currentTarget.value)
        } else {
            props.setValue(`rates.${id}.rate`, e.currentTarget.value)
        }
    }

    return (
        <div style={{width: '100%', paddingBottom: '40px', borderBottom: '1px solid #bdbdbd', marginBottom: '20px'}}>
            <HandlingTitle margin_bottom='0px'>FREIGHT RATE</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {usageFees?.length > 0 && quote_shipping_mode_id !== ShippingModeEnum.ULD
                                && <TableCell className={classes.cell}>
                                    CONTAINER TYPE
                                   </TableCell>
                            }
                            <TableCell className={classes.cell} align="left">
                                CURRENCY
                            </TableCell>
                            {usageFees?.length > 0 && quote_shipping_mode_id !== ShippingModeEnum.ULD
                                ? (<TableCell className={classes.cell} align="left">
                                    RATE
                                </TableCell>)
                                : (<TableCell className={classes.cell} align="left">
                                    RATE PER W/M
                                </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usageFees.length > 0 && quote_shipping_mode_id !== ShippingModeEnum.ULD
                            ? usageFees.map(fee => (
                                <TableRow key={fee.id} >
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
                                                                             maxW='70px'
                                                                             placeholder='Currency'
                                                        />
                                                    }
                                        />
                                    </TableCell>
                                    <TableCell className={classes.innerCell} align="left">
                                       {/* <Controller control={props.control}
                                                    name={`rates.${fee.id}.rate`}
                                                    defaultValue=''
                                                    render={({}) => (
                                                        <div style={{position: 'relative'}}>
                                                            <Field placeholder='0.00$' maxW='100px'
                                                                   onChange={(e) => onChange(e, String(fee.id))}
                                                                   onBlur={() => setAware(false)}
                                                                   type='number'
                                                            />
                                                            {awareMessage && String(fee.id) === rate_value
                                                            && <SpanAware><Title>You are setting this freight rate as $0 and only surcharges will apply,
                                                                please double check before saving.</Title></SpanAware>}
                                                        </div>
                                                    )
                                                    }

                                        />*/}
                                        <Field placeholder='0.00$' maxW='100px'
                                               name={`rates.${fee.id}.rate`}
                                               ref={props.register}
                                              /* onChange={(e) => onChange(e, String(fee.id))}
                                               onBlur={() => setAware(false)}*/
                                               type='number'
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
                                                                                 maxW='70px'
                                                            />
                                                        }
                                            />
                                        </TableCell>
                                        <TableCell className={classes.innerCell} align="left">
                                           {/* <Controller control={props.control}
                                                        name={`rates.rate`}
                                                        rules={{required: true}}
                                                        defaultValue={0}
                                                        render={({}) => (
                                                            <div style={{position: 'relative'}}>
                                                                <Field placeholder='0.00$' maxW='100px'
                                                                       onChange={(e) => onChange(e, String(0))}
                                                                       onBlur={() => setAware(false)}
                                                                       type='number'
                                                                />
                                                                {awareMessage && String(0) === rate_value
                                                                && <SpanAware><Title>Rate will be register as 0. Are you
                                                                    sure?</Title></SpanAware>}
                                                            </div>
                                                        )
                                                        }
                                            />*/}
                                            <Field placeholder='0.00$' maxW='100px'
                                                   name={`rates.rate`}
                                                   ref={props.register}
                                                /* onChange={(e) => onChange(e, String(fee.id))}
                                                 onBlur={() => setAware(false)}*/
                                                   type='number'
                                            />
                                        </TableCell>
                                    </>
                                </TableRow>
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default RatesForQuotesTable