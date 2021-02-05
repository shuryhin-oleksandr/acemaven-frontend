import React, {useEffect, useState} from "react";
//moment js
import moment from "moment";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//react-hook-form
import {Controller} from "react-hook-form";
//material ui
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {IconButton} from "@material-ui/core";
//helpers
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//types
import {ContainerType, SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {RateForSurchargeType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {ShippingModeEnum} from "../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//BLL
import {getSurchargeForExactRateThunk} from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {rateActions} from "../../../../../../_BLL/reducers/surcharge&rates/rateReducer";
import {getRateBookedDatesSelector} from "../../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import FCLField from "./FCLField";
import ScrollbarStyled from "../../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import DatesCells from "./DatesCells";
import FormField from "../../../../../components/_commonComponents/Input/FormField";
//styled-components
import styled from "styled-components";
//styles
import {HandlingTitle} from "../../../surcharge/surcharges_page/surcharge/sea-conteneraized-cargo-styles";
import {HelperText} from "../../../../../components/_commonComponents/Input/input-styles";
//icons
import close_icon from '../../../../../assets/icons/close-icon.svg'


const useStyles = makeStyles({
    container: {
        boxShadow: "none",
        paddingRight: 12,
        overflowX: 'unset'
    },
    table: {
        "& .MuiTableHead-root": {},
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
    usageFees: ContainerType[]
    control: any
    errors: any
    setValue: any
    register: any
    setNewSurchargePopUpVisible: (value: boolean) => void
    getValues: any
    existing_surcharge: any
    surcharge: SurchargeInfoType | null
    rate_data_for_surcharge: RateForSurchargeType | null
    required_dates: boolean,
    shipping_value: number
}

const Rates: React.FC<PropsType> = ({
                                        usageFees, control, register, errors, setValue, getValues, shipping_value,
                                        rate_data_for_surcharge, surcharge, required_dates
                                    }) => {
    const classes = useStyles()

    const reservedDates = useSelector(getRateBookedDatesSelector)

    const dispatch = useDispatch()
    const getSurchargeToRateHandle = (id: number, from: string, to: string) => {
        let surcharge_to_rate = {
            start_date: moment(from).format('DD/MM/YYYY'),
            expiration_date: moment(to).format('DD/MM/YYYY'),
            carrier: getValues('carrier'),
            shipping_mode: getValues('shipping_mode'),
            destination: Number(JSON.parse(
                // @ts-ignore
                sessionStorage.getItem("destination_id")
            ).id),
            origin: Number(JSON.parse(
                // @ts-ignore
                sessionStorage.getItem("origin_id")
            ).id),
            transit_time: Number(getValues('transit_time'))
        }
        dispatch(rateActions.setRateDataForSurcharge(surcharge_to_rate))
        dispatch(getSurchargeForExactRateThunk(surcharge_to_rate))
    }

    useEffect(() => {
        if (surcharge) {
            dispatch(getSurchargeForExactRateThunk(rate_data_for_surcharge))
        }
    }, [surcharge])

    const [awareMessage, setAware] = useState(false)
    const [rate_value, setRateValue] = useState('')
    let onChange = (e: any, id: string) => {
        if (e.value === '0' || 0) {
            setRateValue(id)
            setAware(true)
            setValue(`rates.${id}.rate`, e.value)
        } else {
            setValue(`rates.${id}.rate`, e.value)
        }
    }

    const [invalidDate, setInvalidDate] = useState('')

    return (
        <div>
            <HandlingTitle>RATES</HandlingTitle>
            <ScrollbarStyled {...{style: {width: 850, height: 450, marginBottom: 20}}}>
                <TableContainer className={classes.container} component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {usageFees.length > 0 && shipping_value !== ShippingModeEnum.ULD &&
                                <TableCell className={classes.cell}>CONTAINER TYPE </TableCell>}
                                <TableCell className={classes.cell} align="left">
                                    CURRENCY
                                </TableCell>
                                {usageFees.length > 0 && shipping_value !== ShippingModeEnum.ULD
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
                            {usageFees.length > 0 && shipping_value !== ShippingModeEnum.ULD
                                ? usageFees.map(fee => {
                                    if (reservedDates) {
                                        return {...fee, ...reservedDates.find(d => d.container_type === fee.id)}
                                    } else {
                                        return fee
                                    }
                                }).map(fee => (
                                    <TableRow key={fee.id}>
                                        <FCLField fee={fee}
                                                  getSurchargeToRateHandle={getSurchargeToRateHandle}
                                                  setValue={setValue}
                                                  control={control}
                                                  getValues={getValues}
                                                  errors={errors}
                                                  required_dates={required_dates}
                                                  setAware={setAware}
                                                  awareMessage={awareMessage}
                                                  rate_value={rate_value}
                                                  onChange={onChange}
                                        />
                                    </TableRow>
                                ))
                                : <>
                                    <TableRow>
                                        <>
                                            <TableCell className={classes.innerCell} align="left">
                                                <Controller control={control}
                                                            name={`rates.currency`}
                                                            defaultValue={currency[0].id}
                                                            as={
                                                                <SurchargeRateSelect options={currency}
                                                                                     max_width='70px'
                                                                />
                                                            }
                                                />
                                            </TableCell>
                                            <TableCell className={classes.innerCell} align="left">
                                                {/*<Controller control={control}
                                                            name={`rates.rate`}
                                                            rules={{required: true}}
                                                            defaultValue={0}
                                                            render={({}) => (
                                                                <div style={{position: 'relative'}}>
                                                                    <Field placeholder='0.00$' maxW='100px'
                                                                           onChange={(e) => onChange(e, String(0))}
                                                                           onBlur={() => setAware(false)}
                                                                           type='number'
                                                                           step='0.0001'

                                                                    />
                                                                    {awareMessage && String(0) === rate_value
                                                                    && <SpanAware><Title>Rate will be register as 0. Are you sure?</Title></SpanAware>}
                                                                </div>
                                                            )
                                                            }

                                                />*/}
                                                <div style={{position: 'relative'}}>
                                                    <FormField name={`rates.rate`}
                                                               inputRef={register({
                                                                   required: true,
                                                                   minLength: 1,
                                                                   maxLength: 10
                                                               })}
                                                               min='1'
                                                               max='10'
                                                               defaultValue=''
                                                               placeholder='0.00'
                                                               type='number'
                                                               marginBottom='0px'
                                                               max_width='107px'

                                                    />
                                                    {awareMessage && String(0) === rate_value
                                                    &&
                                                    <SpanAware>
                                                        <Title>Rate will be register as 0. Are you sure?</Title>
                                                        <IconButton style={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            backgroundColor: 'rgba(255, 255, 255, .7)',
                                                            padding: '5px'
                                                        }}
                                                                    onClick={() => setAware(false)}
                                                        >
                                                            <img src={close_icon} alt="" style={{width: '8px'}}/>
                                                        </IconButton>
                                                    </SpanAware>}
                                                </div>
                                            </TableCell>
                                            <DatesCells
                                                setValue={setValue}
                                                control={control}
                                                id={0}
                                                errors={errors}
                                                classes={classes}
                                                getValues={getValues}
                                                getSurchargeToRateHandle={getSurchargeToRateHandle}
                                                reservedDates={reservedDates ? reservedDates[0].disabledDates : []}
                                                required_dates={required_dates}
                                                invalidDate={invalidDate}
                                                setInvalidDate={setInvalidDate}
                                                margin_top='0px'
                                            />
                                        </>
                                        {invalidDate && <HelperText messagePaddingTop='25px'>{invalidDate}</HelperText>}
                                    </TableRow>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </ScrollbarStyled>
        </div>
    )
}

export default Rates


export const SpanAware = styled.div`
  width: 276px;
  height: 68px;
  background-color: rgba(0, 0, 0, .6);
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  position: absolute;
  font-size: 14px;
  line-height: 16px;
  padding: 5px;
  z-index: 150;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 73%, 88% 73%, 86% 90%, 84% 73%, 0 73%);
  transform: rotate(180deg);
`
export const Title = styled.div`
   transform: rotate(180deg);
   margin-bottom: 3px;
`
