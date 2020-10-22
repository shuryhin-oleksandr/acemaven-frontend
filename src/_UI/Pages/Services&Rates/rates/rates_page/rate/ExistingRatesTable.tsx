import React, {useState} from 'react'
import {HandlingTitle, SpanType} from "../../../surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Controller} from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";
import DatesCells from "../../register_new_freight_rate/tables/DatesCells";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";
import {getRateBookedDatesSelector} from "../../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import {SpanAware, Title} from "../../register_new_freight_rate/tables/Rates";

type PropsType = {
    rate: any//RateInfoType | null,
    control: any,
    setValue: (value: string | number) => void,
    getValues: any
    errors: any
    getSurchargeForRate: any
    setFormMode: (value: boolean) => void
}

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        height: "420px",
        overflowY: "scroll",
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
        borderBottom: "1px solid #115B86",
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

const ExistingRatesTable:React.FC<PropsType> = ({rate, control, getValues, setValue,errors, getSurchargeForRate, setFormMode}) => {
    const classes = useStyles();

    let reservedDates = useSelector(getRateBookedDatesSelector)

    /*const [awareMessage, setAware] = useState(false)
    const [rate_value, setRateValue] = useState('')
    let onChange = (e: any, id: string) => {
        if(e.currentTarget.value === '0') {
            setRateValue(id)
            setAware(true)
            // @ts-ignore
            setValue(`rates.${id}.rate`, e.currentTarget.value)
        } else {
            // @ts-ignore
            setValue(`rates.${id}.rate`, e.currentTarget.value)
        }
    }
*/
    return (
        <div style={{width: '100%', maxWidth: '1002px'}}>
            <HandlingTitle>RATES</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {rate?.shipping_mode.id === 2 ||
                            (rate?.shipping_mode.id === 3 && (
                                <TableCell className={classes.cell}>
                                    CONTAINER TYPE
                                </TableCell>
                            ))}
                            <TableCell className={classes.cell} align="left">
                                CURRENCY
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                RATE
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                START DATE
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                EXPIRATION DATE
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                UPDATE BY
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                ON
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {   rate.rates.map((r: any ) => (
                            <TableRow key={r.id} className={classes.info_row}>
                                {rate?.shipping_mode.id === 2 ||
                                (rate?.shipping_mode.id === 3 && (
                                    <Controller
                                        control={control}
                                        defaultValue={r.container_type.id}
                                        name={`rates.${r.id}.container_type`}
                                        as={
                                            <TableCell
                                                className={classes.innerCell}
                                                component="th"
                                                scope="row"
                                            >
                                                <SpanType onClick={() => getSurchargeForRate(r.start_date, r.expiration_date)}>
                                                    {r.container_type.code}
                                                </SpanType>
                                            </TableCell>
                                        }
                                    />
                                ))}
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode(true)}>
                                    <Controller
                                        control={control}
                                        name={`rates.${r.id}.currency`}
                                        defaultValue={r.currency.id}
                                        as={
                                            <SurchargeRateSelect
                                                options={currency}
                                                maxW="70px"
                                            />
                                        }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left" onClick={() => setFormMode(true)}>
                                    <Controller
                                        control={control}
                                        name={`rates.${r.id}.rate`}
                                        defaultValue={r.rate}
                                        as={
                                            <Field placeholder="0.00$"
                                                   maxW="100px"
                                                   type='number'
                                            />
                                        }
                                    />
                                </TableCell>
                                <DatesCells
                                    currentDates={{from: r.start_date, to: r.expiration_date}}
                                    setValue={setValue}
                                    control={control}
                                    id={r.id}
                                    reservedDates={r.disabledDates || []}
                                    errors={errors}
                                    classes={classes}
                                    getValues={getValues}
                                    getSurchargeToRateHandle={() => {}}
                                    setFormMode={setFormMode}
                                />
                                <Controller
                                    control={control}
                                    defaultValue={r.updated_by}
                                    name={`rates.${r.id}.updated_by`}
                                    as={
                                        <TableCell
                                            className={classes.innerCell}
                                            align="left"
                                        >
                                            {r.updated_by}
                                        </TableCell>
                                    }
                                />
                                <Controller
                                    control={control}
                                    defaultValue={r.date_updated}
                                    name={`rates.${r.id}.date_updated`}
                                    as={
                                        <TableCell
                                            className={classes.innerCell}
                                            align="left"
                                        >
                                            {r.date_updated}
                                        </TableCell>
                                    }
                                />
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ExistingRatesTable