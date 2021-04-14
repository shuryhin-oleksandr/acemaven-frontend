import React, {useState} from 'react'
//react-hook-rom
import {Controller} from "react-hook-form";
//material ui
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
//helpers
import {currency} from "../../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
//types
import {ContainerType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import DatesCells from "./DatesCells";
//styles
import {Field, HelperText} from "../../../../../components/_commonComponents/Input/input-styles";


type PropsType = {
    fee: ContainerType,
    getSurchargeToRateHandle: any,
    control: any,
    register: any,
    errors: any,
    getValues: any,
    setValue: any,
    required_dates: any,
    onChange: any
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

const FCLField: React.FC<PropsType> = ({
                                           fee, getSurchargeToRateHandle, setValue, errors, control,
                                           getValues, required_dates, ...props
                                       }) => {

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
                                                     max_width='80px'
                                                     placeholder='Currency'
                                />
                            }
                />
            </TableCell>
            <TableCell className={classes.innerCell} align="left">
                <Field placeholder='0.00'
                       name={`rates.${fee.id}.rate`}
                       ref={props.register({
                           //required: true,
                           minLength: 1,
                           maxLength: 10
                       })}
                       max_width='100px'
                       type='number'
                       step='0.0001'
                       onChange={(e) => props.onChange(e.currentTarget)}
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