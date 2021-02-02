import React from "react";
import {
    ActionsWrap, LineWrap, SettingsField,
    SettingsSubtitle,
    SettingsTitle,
} from "../../../Pages/Profile&Settings/GeneralSettings/general-settings-styles";
import {CustomizedSwitch} from "../buttons/switch/SwitchButton";
import {Outer} from "./settings-notification-styles";

type PropsType = {
    title?: string,
    subtitle?: string,
    name?: string,
    notification?: {switch: boolean | undefined, days: number | undefined}
}

const SettingsNotificationCard:React.FC<PropsType> = ({title, subtitle, name}) => {
    return (
        <Outer>
            <SettingsTitle>{title}</SettingsTitle>
            <SettingsSubtitle>{subtitle}</SettingsSubtitle>
            <ActionsWrap>
                <CustomizedSwitch />
                <SettingsField name={name} placeholder='No. of days '/>
            </ActionsWrap>
            <LineWrap/>
        </Outer>
    )
}

export default SettingsNotificationCard
