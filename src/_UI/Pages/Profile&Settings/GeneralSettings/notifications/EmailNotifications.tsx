import React, {useEffect} from "react";
//react-hook-form
import {FormProvider, useForm} from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {changeMySettingsThunk} from "../../../../../_BLL/thunks/profile/profileThunks";
import {getMyInfoSelector} from "src/_BLL/selectors/profile/profileSelectors";
//types
import {AppCompaniesTypes} from "../../../../../_BLL/types/commonTypes";
import {settingsType} from "../../../../../_BLL/types/profile/profileTypes";
//components
import SettingsNotificationCard
    from "../../../../components/_commonComponents/settingsNotification/SettingsNotificationCard";
import SettingsNotificationRadio
    from "../../../../components/_commonComponents/settingsNotification/SettingsNotificationRadio/SettingsNotificationRadio";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {SettingsWrap} from "../general-settings-styles";
import {useTranslation} from "react-i18next";



const EmailNotifications: React.FC<{ my_settings: settingsType | null }> = ({my_settings}) => {

    const my_info = useSelector(getMyInfoSelector)
    const company_type = my_info?.companies && my_info?.companies?.length > 0 && my_info?.companies[0].type

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

    const submitThunk = (final_data: any) => {
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

        my_settings && Object.keys(changed_fields).length > 0 &&  dispatch(changeMySettingsThunk(my_settings?.id, changed_fields))
    }

    const {t} = useTranslation();
    return (
        <ScrollbarStyled {...{
            style: {width: "100%"},
            autoHeightMin: 419,
            autoHeightMax: "calc(100vh - 341px)",
            autoHeight: true
        }}>
            <FormProvider {...methods} >
                <SettingsWrap >
                    {(company_type === AppCompaniesTypes.AGENT)
                    &&
                    <>
                        <SettingsNotificationCard title={t("Email notifications/Surcharge Expiration")}
                                                  subtitle={t("Email notifications/Number of days_Surcharge")}
                                                  switch_name='surcharge_expiration'
                                                  name='surcharge_expiration_days'
                                                  notification={{
                                                      switch: my_settings?.surcharge_expiration,
                                                      days: my_settings?.surcharge_expiration_days
                                                  }}
                                                  submitThunk={submitThunk}

                        />
                        <SettingsNotificationCard title={t("Email notifications/Freight Rate Expiration")}
                                                  subtitle={t("Email notifications/Number of days_Freight")}
                                                  switch_name='freight_rate_expiration'
                                                  name='freight_rate_expiration_days'
                                                  notification={{
                                                      switch: my_settings?.freight_rate_expiration,
                                                      days: my_settings?.freight_rate_expiration_days
                                                  }}
                                                  submitThunk={submitThunk}
                        />
                    </>
                    }
                    <SettingsNotificationCard title={t("Email notifications/Sea Import Shipment Arrival Alert")}
                                              subtitle={t("Email notifications/Will alert_Sea")}
                                              switch_name='sea_import_shipment_arrival_alert'
                                              name='sea_import_shipment_arrival_alert_days'
                                              notification={{
                                                  switch: my_settings?.sea_import_shipment_arrival_alert,
                                                  days: my_settings?.sea_import_shipment_arrival_alert_days
                                              }}
                                              submitThunk={submitThunk}

                    />
                    <SettingsNotificationRadio title={t("Email notifications/Import Shipment Departure Alert")}
                                               subtitle={t("Email notifications/Will alert_Import")}
                                               name='import_shipment_departure_alert'
                                               submitThunk={submitThunk}
                    />
                    <SettingsNotificationRadio title={t("Email notifications/Export Shipment Arrival Alert")}
                                               subtitle={t("Email notifications/Will alert_Export")}
                                               name='export_shipment_arrival_alert'
                                               submitThunk={submitThunk}
                    />
                    <SettingsNotificationRadio title={t("Email notifications/Operation Details Change")}
                                               subtitle={t("Email notifications/Operation_Operation")}
                                               name='operation_details_change'
                                               submitThunk={submitThunk}
                    />
                </SettingsWrap>
            </FormProvider>
        </ScrollbarStyled>
    )
}


export default EmailNotifications