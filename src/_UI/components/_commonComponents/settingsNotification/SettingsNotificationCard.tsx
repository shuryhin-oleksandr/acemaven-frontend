import React from "react";
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
    setEditMode: (value: boolean) => void
}

const SettingsNotificationCard: React.FC<PropsType> = ({title, subtitle, name, switch_name, notification, ...props}) => {

    const {register} = useFormContext()

    return (
        <Outer>
            <SettingsTitle>{title}</SettingsTitle>
            <SettingsSubtitle>{subtitle}</SettingsSubtitle>
            <ActionsWrap>
                <CustomizedSwitch
                    switch_name={switch_name}
                    setEditMode={props.setEditMode}
                />
                <SettingsField name={name}
                               ref={register}
                               type='number'
                               autoComplete="off"
                               step='1'
                               defaultValue={notification?.days ? notification.days : '0'}
                               placeholder='No. of days '
                               onFocus={() => props.setEditMode(true)}
                />
            </ActionsWrap>
            <LineWrap/>
        </Outer>
    )
}

export default SettingsNotificationCard
