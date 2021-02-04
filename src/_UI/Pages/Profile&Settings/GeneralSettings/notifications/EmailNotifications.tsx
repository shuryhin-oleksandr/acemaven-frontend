import React, {useEffect, useState} from "react";
//react-hook-form
import {FormProvider, useForm} from "react-hook-form";
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {changeMySettingsThunk} from "../../../../../_BLL/thunks/profile/profileThunks";
//types
import {settingsType} from "../../../../../_BLL/types/profile/profileTypes";
//components
import SettingsNotificationCard
    from "../../../../components/_commonComponents/settingsNotification/SettingsNotificationCard";
import SettingsNotificationRadio
    from "../../../../components/_commonComponents/settingsNotification/SettingsNotificationRadio/SettingsNotificationRadio";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import BaseButton from "src/_UI/components/base/BaseButton";
import OutlineButton from "src/_UI/components/_commonComponents/buttons/outline_button/OutlineButton";
//styles
import {SettingsWrap} from "../general-settings-styles";


const EmailNotifications: React.FC<{ my_settings: settingsType | null }> = ({my_settings}) => {

    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (my_settings) {
            Object.keys(my_settings).forEach((key: string) => {
                if (
                    key === "import_shipment_departure_alert" ||
                    key === "export_shipment_arrival_alert" ||
                    key === "operation_details_change"
                ) {
                    methods.setValue(key, my_settings[key] ? 'yes' : 'no')
                } else {
                    methods.setValue(key, my_settings[key])
                }
            })
        }
    }, [my_settings])


    const methods = useForm()
    const dispatch = useDispatch()
    const onSubmit = (values: any) => {

        let final_data = {
            ...values,
            import_shipment_departure_alert: values.import_shipment_departure_alert === 'yes',
            export_shipment_arrival_alert: values.export_shipment_arrival_alert === 'yes',
            operation_details_change: values.operation_details_change === 'yes',
        }

        let changed_fields = {};

        my_settings && Object.keys(my_settings).forEach(k => Object.keys(final_data).forEach(k2 => {
            if (k === k2) {
                if (my_settings && (my_settings[k] != final_data[k2])) {
                    return changed_fields[k2] = final_data[k2]
                }
            } else {
                return k
            }
        }))
        console.log(changed_fields)
        my_settings && dispatch(changeMySettingsThunk(my_settings?.id, changed_fields, setEditMode))
    }


    return (
        <ScrollbarStyled {...{
            style: {width: "100%"},
            autoHeightMin: 419,
            autoHeightMax: "calc(100vh - 341px)",
            autoHeight: true
        }}>
            <FormProvider {...methods} >
                <SettingsWrap onSubmit={methods.handleSubmit(onSubmit)}>
                    {editMode &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: '10px',
                        right: '50px',
                        maxWidth: '310px',
                        width: '100%'
                    }}>
                        <BaseButton type='submit'
                        >
                            SAVE
                        </BaseButton>
                        <OutlineButton type='button'
                                       borderColor='1px solid rgba(0, 0, 0, .6)'
                                       text_color='rgba(0, 0, 0, .6)'
                                       text='CANCEL'
                                       font_size='14px'
                                       button_width='146px'
                                       callback={() => setEditMode(false)}
                        />
                    </div>
                    }
                    <SettingsNotificationCard title='Surcharge Expiration'
                                              subtitle='Number of days to notify before a surcharge expires'
                                              switch_name='surcharge_expiration'
                                              name='surcharge_expiration_days'
                                              notification={{
                                                  switch: my_settings?.surcharge_expiration,
                                                  days: my_settings?.surcharge_expiration_days
                                              }}
                                              setEditMode={setEditMode}

                    />
                    <SettingsNotificationCard title='Freight Rate Expiration'
                                              subtitle='Number of days to notify before a freight rate expires'
                                              switch_name='freight_rate_expiration'
                                              name='freight_rate_expiration_days'
                                              notification={{
                                                  switch: my_settings?.freight_rate_expiration,
                                                  days: my_settings?.freight_rate_expiration_days
                                              }}
                                              setEditMode={setEditMode}

                    />
                    <SettingsNotificationCard title='Sea Import Shipment Arrival Alert'
                                              subtitle='Will alert you a specific number of days before the Estimated Time of Arrival date of an import shipment (0 will be no notification).'
                                              switch_name='sea_import_shipment_arrival_alert'
                                              name='sea_import_shipment_arrival_alert_days'
                                              notification={{
                                                  switch: my_settings?.sea_import_shipment_arrival_alert,
                                                  days: my_settings?.sea_import_shipment_arrival_alert_days
                                              }}
                                              setEditMode={setEditMode}

                    />
                    <SettingsNotificationRadio title='Import Shipment Departure Alert'
                                               subtitle='Will alert when the departure date of and import shipment of you is set.'
                                               name='import_shipment_departure_alert'
                                               setEditMode={setEditMode}
                    />
                    <SettingsNotificationRadio title='Export Shipment Arrival Alert'
                                               subtitle='Will alert when the arrival date of an export shipment of you is set.'
                                               name='export_shipment_arrival_alert'
                                               setEditMode={setEditMode}
                    />
                    <SettingsNotificationRadio title='Operation Details Change'
                                               subtitle='Operation detail changes that are not updates to the departure (Actual Time of Departure) or arrival (Actual Time of Arrival) dates of the shipment'
                                               name='operation_details_change'
                                               setEditMode={setEditMode}
                    />
                </SettingsWrap>
            </FormProvider>
        </ScrollbarStyled>
    )
}


export default EmailNotifications