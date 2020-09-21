import React from "react";
import {
    GeneralContainer,
    GeneralInner,
    GeneralTitle,
    SettingsWrap
} from "./general-settings-styles";
import SettingsNotificationCard
    from "../../../components/_commonComponents/settingsNotification/SettingsNotificationCard";
import SettingsNotificationRadio
    from "../../../components/_commonComponents/settingsNotification/SettingsNotificationRadio/SettingsNotificationRadio";



const GeneralSettingsPage:React.FC = () => {
    return (
        <GeneralContainer>
            <GeneralInner>
                <GeneralTitle>Settings</GeneralTitle>
                <SettingsWrap>
                    <SettingsNotificationCard title='Surcharge Expiration'
                                              subtitle='Number of days to notify before a surcharge expires'
                                              name='surcharge'
                    />
                    <SettingsNotificationCard title='Freight Rate Expiration'
                                              subtitle='Number of days to notify before a freight rate expires'
                                              name='freightRate'
                    />
                    <SettingsNotificationCard title='Sea Import Shipment Arrival Alert'
                                              subtitle='Will alert you a specific number of days before the Estimated Time of Arrival date of an import shipment (0 will be no notification).'
                                              name='seaShipment'
                    />
                    <SettingsNotificationRadio title='Import Shipment Departure Alert'
                                               subtitle='Will alert when the departure date of and import shipment of you is set.'
                                               name='importShipment'
                    />
                    <SettingsNotificationRadio title='Export Shipment Arrival Alert'
                                               subtitle='Will alert when the arrival date of an export shipment of you is set.'
                                               name='exportShipment'
                    />
                    <SettingsNotificationRadio title='Operation Details Change'
                                               subtitle='Operation detail changes that are not updates to the departure (Actual Time of Departure) or arrival (Actual Time of Arrival) dates of the shipment'
                                               name='operationsDetails'
                    />
                </SettingsWrap>
            </GeneralInner>
        </GeneralContainer>
    )
}

export default GeneralSettingsPage