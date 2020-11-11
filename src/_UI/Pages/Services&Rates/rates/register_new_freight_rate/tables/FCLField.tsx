import React, {useState} from 'react'
import {Controller} from "react-hook-form";
import TableCell from "@material-ui/core/TableCell";
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import {Field, HelperText} from "../../../../../components/_commonComponents/Input/input-styles";
import DatesCells from "./DatesCells";

import {SpanAware, Title} from "./Rates";
import {ContainerType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import makeStyles from "@material-ui/core/styles/makeStyles";

type PropsType = {
    fee: ContainerType,
    getSurchargeToRateHandle: any,
    control: any,
    errors: any,
    getValues: any,
    setValue: any,
    required_dates: any,
    setAware: (value: boolean) => void,
    awareMessage: boolean,
    rate_value: string,
    onChange: (e: any, id: string) => void
}

const useStyles = makeStyles({
    innerCell: {
        borderBottom: "1px solid #E0E0E0;",
        fontFamily: "Helvetica Light",
        fontSize: "16px",
        color: "#1B1B25",
        padding: "8px 0 0",
    }
});

const FCLField:React.FC<PropsType> = ({fee, getSurchargeToRateHandle, setValue, errors, control, onChange,
                                          getValues, required_dates, setAware, awareMessage, rate_value}) => {

    const classes = useStyles()
    const [invalidDate, setInvalidDate] = useState('')

    return (
        <>
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
                                                     placeholder='Currency'
                                />
                            }
                />
            </TableCell>
            <TableCell className={classes.innerCell} align="left">
                <Controller control={control}
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

                />
            </TableCell>
            <DatesCells
                setValue={setValue}
                control={control}
                id={fee.id}
                // @ts-ignore
                reservedDates={fee.disabledDates || []}
                errors={errors}
                classes={classes}
                getValues={getValues}
                getSurchargeToRateHandle={getSurchargeToRateHandle}
                required_dates={required_dates}
                invalidDate={invalidDate}
                setInvalidDate={setInvalidDate}
            />
            {invalidDate && <HelperText messagePaddingTop='25px'>{invalidDate}</HelperText>}
        </>
    )
}

export default FCLField