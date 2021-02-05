import React, {useState} from "react";
//react-hook-form
import {useFormContext} from "react-hook-form";
//components
import {CustomizedSwitch} from "../buttons/switch/SwitchButton";
//styles
import {
    ActionsWrap, LineWrap, SettingsField,
    SettingsSubtitle,
    SettingsTitle,
} from "../../../Pages/Profile&Settings/GeneralSettings/general-settings-styles";
import {Outer} from "./settings-notification-styles";


type PropsType = {
    title?: string,
    subtitle?: string,
    name?: string,
    switch_name: string
    notification?: { switch: boolean | undefined, days: number | undefined },
    submitThunk: (value: any) => void
}

const SettingsNotificationCard: React.FC<PropsType> = ({title, subtitle, name, switch_name, notification, ...props}) => {

    const {register} = useFormContext()
    const [inputValue, setInputValue] = useState('')

    let input_obj = {}
    input_obj[`${name}`] = inputValue

    return (
        <Outer>
            <SettingsTitle>{title}</SettingsTitle>
            <SettingsSubtitle>{subtitle}</SettingsSubtitle>
            <ActionsWrap>
                <CustomizedSwitch
                    switch_name={switch_name}
                    submitThunk={props.submitThunk}
                />
                <SettingsField name={name}
                               ref={register}
                               type='number'
                               autoComplete="off"
                               step='1'
                               defaultValue={notification?.days ? notification.days : '0'}
                               placeholder='No. of days '
                               onChange={(e) => setInputValue(e.currentTarget.value)}
                               onBlur={() => props.submitThunk(input_obj)}
                />
            </ActionsWrap>
            <LineWrap/>
        </Outer>
    )
}

export default SettingsNotificationCard
