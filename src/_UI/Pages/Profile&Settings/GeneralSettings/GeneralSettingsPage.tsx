import React from "react";
import {
    ActionsWrap,
    GeneralContainer,
    GeneralInner,
    GeneralTitle, SettingsField,
    SettingsSubtitle,
    SettingsTitle,
    SettingsWrap
} from "./general-settings-styles";



const GeneralSettingsPage:React.FC = () => {
    return (
        <GeneralContainer>
            <GeneralInner>
                <GeneralTitle>Settings</GeneralTitle>
                <SettingsWrap>
                    <SettingsTitle>Surcharge Expiration</SettingsTitle>
                    <SettingsSubtitle>Number of days to notify before a surcharge expires </SettingsSubtitle>
                    <ActionsWrap>
                        <SettingsField/>
                    </ActionsWrap>
                </SettingsWrap>
            </GeneralInner>
        </GeneralContainer>
    )
}

export default GeneralSettingsPage