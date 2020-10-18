import React, {useEffect} from "react";
import {HandlingTitle} from "../../../surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Controller} from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Field} from "../../../../../components/_commonComponents/Input/input-styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ContainerType, SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import {useDispatch, useSelector} from "react-redux";
import {getBookedDates} from "../../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import moment from "moment";
import DatesCells from "./DatesCells";
import {getSurchargeForExactRateThunk} from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
import {rateActions} from "../../../../../../_BLL/reducers/surcharge&rates/rateReducer";
import {RateForSurchargeType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";

const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        width: 760,
        height: '420px',
        overflowY: 'scroll'
    },
    table: {
        "& .MuiTableHead-root": {},
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
    usageFees: ContainerType[]
    control: any
    errors: any
    setValue: any
    register: any
    setNewSurchargePopUpVisible: VoidFunctionType
    getValues: any
    existing_surcharge: any
    surcharge: SurchargeInfoType | null
    rate_data_for_surcharge: RateForSurchargeType | null
}

const Rates:React.FC<PropsType> = ({usageFees, control, errors, setValue, getValues,
                                       rate_data_for_surcharge, surcharge}) => {
    const classes = useStyles()

    const reservedDates = useSelector(getBookedDates)
    const bookedDates = reservedDates?.push({before: new Date()})
    console.log('bookes', bookedDates)


    //CALENDAR
    /*useEffect(() => {
        if(surcharge && !sessionStorage.getItem('reg')) {
            setSelectedDay({from: moment(surcharge.start_date, 'DD/MM/YYYY').toDate(),
                to: moment(surcharge.expiration_date, 'DD/MM/YYYY').toDate()})
            setValue('from', surcharge.start_date)
            setValue('to', surcharge.expiration_date)
            console.log(new Date(surcharge.start_date))
        }
    }, [surcharge])*/

    const dispatch = useDispatch()
    const getSurchargeToRateHandle = (id: number, from: string, to: string) => {
        let surcharge_to_rate = {
            start_date: moment(from).format('DD/MM/YYYY'),
            expiration_date: moment(to).format('DD/MM/YYYY'),
            carrier: getValues('carrier'),
            shipping_mode: getValues('shipping_mode'),
            origin: Number(sessionStorage.getItem('origin_id')),
            destination: Number(sessionStorage.getItem('destination_id')),
            transit_time: Number(getValues('transit_time'))
        }
        dispatch(rateActions.setRateDataForSurcharge(surcharge_to_rate))
        dispatch(getSurchargeForExactRateThunk(surcharge_to_rate))
    }

    useEffect(() => {
        debugger
        if(surcharge) {
            dispatch(getSurchargeForExactRateThunk(rate_data_for_surcharge))
        }
    }, [surcharge])


    return (
        <div>
            <HandlingTitle>RATES</HandlingTitle>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {usageFees.length > 0 && <TableCell className={classes.cell}>CONTAINER TYPE </TableCell>}
                            <TableCell className={classes.cell} align="left">
                                CURRENCY
                            </TableCell>
                            {usageFees.length > 0
                                ? (<TableCell className={classes.cell} align="left">
                                    RATE
                                </TableCell>)
                                : (<TableCell className={classes.cell} align="left">
                                    RATE PER W/M
                                </TableCell>)
                            }
                            <TableCell className={classes.cell} align="left">
                                START DATE
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                                EXPIRATION DATE
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usageFees.length > 0
                            ? usageFees?.map((fee) => (
                            <TableRow key={fee.id}>
                                <Controller control={control}
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
                                    <Controller control={control}
                                                name={`rates.${fee.id}.currency`}
                                                defaultValue={currency[0].id}
                                                as={
                                                    <SurchargeRateSelect options={currency}
                                                                         maxW='70px'
                                                    />
                                                }
                                    />
                                </TableCell>
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller control={control}
                                                name={`rates.${fee.id}.rate`}
                                                defaultValue=''
                                                as={
                                                    <Field placeholder='0.00$' maxW='100px'/>
                                                }

                                    />
                                </TableCell>
                                <DatesCells
                                    setValue={setValue}
                                    control={control}
                                    id={fee.id}
                                    reservedDates={reservedDates}
                                    errors={errors}
                                    classes={classes}
                                    getValues={getValues}
                                    getSurchargeToRateHandle={getSurchargeToRateHandle}
                                />
                            </TableRow>
                        ))
                            : <TableRow >
                                <TableCell className={classes.innerCell} align="left">
                                    <Controller control={control}
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
                                    <Controller control={control}
                                                name={`rates.rate`}
                                                defaultValue={0}
                                                as={
                                                    <Field maxW='100px'/>
                                                }

                                    />
                                </TableCell>
                                <DatesCells
                                    setValue={setValue}
                                    control={control}
                                    id={0}
                                    reservedDates={reservedDates}
                                    errors={errors}
                                    classes={classes}
                                    getValues={getValues}
                                />
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Rates
