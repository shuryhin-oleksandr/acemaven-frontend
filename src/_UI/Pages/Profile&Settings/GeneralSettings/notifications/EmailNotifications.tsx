import React from "react";
//types
import {settingsType} from "../../../../../_BLL/types/profile/profileTypes";
//components
import SettingsNotificationCard
    from "../../../../components/_commonComponents/settingsNotification/SettingsNotificationCard";
import SettingsNotificationRadio
    from "../../../../components/_commonComponents/settingsNotification/SettingsNotificationRadio/SettingsNotificationRadio";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {SettingsWrap} from "../general-settings-styles";


const EmailNotifications: React.FC<{ my_settings: settingsType | null}> = ({my_settings}) => {
    return (
        <ScrollbarStyled {...{
            style: {width: "100%"},
            autoHeightMin: 419,
            autoHeightMax: "calc(100vh - 341px)",
            autoHeight: true
        }}>
            <SettingsWrap>
                <SettingsNotificationCard title='Surcharge Expiration'
                                          subtitle='Number of days to notify before a surcharge expires'
                                          name='surcharge'
                                          notification={{
                                              switch: my_settings?.surcharge_expiration,
                                              days: my_settings?.surcharge_expiration_days
                                          }}
                />
                <SettingsNotificationCard title='Freight Rate Expiration'
                                          subtitle='Number of days to notify before a freight rate expires'
                                          name='freightRate'
                                          notification={{
                                              switch: my_settings?.freight_rate_expiration,
                                              days: my_settings?.freight_rate_expiration_days
                                          }}
                />
                <SettingsNotificationCard title='Sea Import Shipment Arrival Alert'
                                          subtitle='Will alert you a specific number of days before the Estimated Time of Arrival date of an import shipment (0 will be no notification).'
                                          name='seaShipment'
                                          notification={{
                                              switch: my_settings?.sea_import_shipment_arrival_alert,
                                              days: my_settings?.sea_import_shipment_arrival_alert_days
                                          }}
                />
                <SettingsNotificationRadio title='Import Shipment Departure Alert'
                                           subtitle='Will alert when the departure date of and import shipment of you is set.'
                                           name='importShipment'
                                           radio_value={my_settings?.import_shipment_departure_alert}
                />
                <SettingsNotificationRadio title='Export Shipment Arrival Alert'
                                           subtitle='Will alert when the arrival date of an export shipment of you is set.'
                                           name='exportShipment'
                                           radio_value={my_settings?.export_shipment_arrival_alert}
                />
                <SettingsNotificationRadio title='Operation Details Change'
                                           subtitle='Operation detail changes that are not updates to the departure (Actual Time of Departure) or arrival (Actual Time of Arrival) dates of the shipment'
                                           name='operationsDetails'
                                           radio_value={my_settings?.operation_details_change}
                />
            </SettingsWrap>
        </ScrollbarStyled>
    )
}


export default EmailNotifications