import React, { useRef, useState} from 'react'
//react-text-mask
import MaskedInput from "react-text-mask";
//react-hook-form
import {Controller} from "react-hook-form";
//styled components
import styled from "styled-components";
//react-day-picker
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import {formatDate, parseDate} from 'react-day-picker/build/addons/MomentLocaleUtils'
//styles
import { CalendarWrapper } from 'src/_UI/components/_commonComponents/calendar/calendar-styles';
import {HelperText} from "../../../../../../../components/_commonComponents/Input/input-styles";


type PropsType = {
    control: any
    setValue: (name: string, value: any) => void
    errors: {from: any, departure_time: any}
    textColor?: string
    textFont?: string
    textTransform?: string
    flex_direction?: string
    display_label?: string
    max_width?: string
    margin_bottom?: string
    input_height?: string
    rate_start_date?: string
    setFormMode?: (value: boolean) => void
    required_dates: boolean,
    label1: string,
    time_name_first: string,
    date_name_first: string,
    start_shipment_date?: string,
    operation_dates?: {from: string, to: string},
    before?: any,
    after?: any,
    wrapper_width?: string,
    justify_content?: string,
    arrival_date?: string,
    first_time?: string,
    register?: any,
}

const ManualTrackingCalendarChoice: React.FC<PropsType> = ({control, errors, register, required_dates, ...props}) => {

    const [selectedDay, setSelectedDay] = useState<any>({
        from:  '',
        to:  ''
    })


    const handleFromChange = (from: string) => {
        props.setFormMode && props.setFormMode(true)
        setSelectedDay({
            ...selectedDay,
            from
        })
        props.setValue(props.date_name_first, from)
    }


    const toInput = useRef<DayPickerInput>(null)


    return (
        <AcceptDatesFilter flex_direction={props.flex_direction} max_width={props.max_width}>
            <Wrapper justify_content={props.justify_content} wrapper_width={'100%'} >
                <CalendarWrapper max_width={'240px'}
                                 margin_bottom={'0px'}
                                 max_width_wrapper={'340px'}
                                 input_height='40px'
                                 margin_right='10px'
                                 picker_right={'200px'}>
                    <div style={{width: '100%', display: "flex", justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <>
                            <Controller
                                name={props.date_name_first}
                                control={control}
                                rules={{
                                    required: 'Field is required'
                                }}
                                defaultValue=""
                                as={
                                    <DayPickerInput
                                        inputProps={{
                                            readOnly:'readonly'
                                        }}
                                        format='DD/MM/YYYY'
                                        placeholder='DD/MM/YYYY'
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        hideOnDayClick={false}
                                        value={selectedDay.from}
                                        // @ts-ignore
                                        onDayChange={handleFromChange}
                                        ref={toInput}
                                        dayPickerProps={{
                                            disabledDays: [{before: new Date()}, {after: props.after}],
                                        }}
                                    />
                                }
                            />
                            {!!errors.from && (
                                <HelperText>Field is required</HelperText>
                            )}
                        </>
                        <Controller name={props.time_name_first}
                                    control={control}
                                    rules={{required: true}}
                                    defaultValue=''
                                    as={
                                        <MaskedInput
                                            mask={[/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]}
                                            className="time_picker"
                                            placeholder="--:--"
                                            guide={false}
                                            id="my-input-id"
                                        />
                                    }
                        />
                    </div>
                </CalendarWrapper>

            </Wrapper>
        </AcceptDatesFilter>
    )
};


export default ManualTrackingCalendarChoice


const AcceptDatesFilter = styled.div<{flex_direction?: string, max_width?: string}>`
  display: flex;
  flex-direction: ${({flex_direction}) => flex_direction ? flex_direction : 'row'};
  width: 100%;
  max-width: ${({max_width}) => max_width ? max_width : '100%'};
  justify-content: space-between;
  margin-bottom: 12px;
`
const Wrapper = styled.div<{justify_content?: string, wrapper_width?: string}>`
  width: ${({wrapper_width}) => wrapper_width ? wrapper_width : '49%'};
  display: flex;
  align-items: center;
  justify-content: ${({justify_content}) => justify_content ? justify_content : 'flex-end'};
`