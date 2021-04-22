import React from 'react'
import LocationBlock from "./LocationBlock";
import {ShipmentDetailsType} from "../../../../_BLL/types/operations/operationsTypes";
import moment from "moment";
import {useTranslation} from "react-i18next";

type PropsType = {
    register: any,
    errors: any,
    direction: string,
    shipping_mode: string,
    color_label?: string,
    font_weight?: string,
    label_uppercase?: boolean,
    shipment_details?:  ShipmentDetailsType | null,
    documents_cut_off_date?: string
}

const LocationContainer:React.FC<PropsType> = ({ register, errors, direction, shipping_mode, color_label, font_weight, ...props}) => {

    let today = moment(new Date()).format('DD/MM/YYYY')
    let disabled = props.documents_cut_off_date && props.documents_cut_off_date < today
    const {t} = useTranslation();
    return (
        <>
            {direction === 'export'
                ? <>
                    {shipping_mode === 'FCL'
                    && <LocationBlock register={register}
                                      errors={errors}
                                      label={t('Booking Confirmation/Empty Pickup Location')}
                                      field_name={'empty_pickup_location'}
                                      google_field_name={'empty_pickup_location_address'}
                                      google_label={true}
                                      color_label={color_label}
                                      font_weight={font_weight}
                                      label_uppercase={props.label_uppercase}
                                      default_location={props.shipment_details?.empty_pick_up_location}
                                      default_address={props.shipment_details?.empty_pick_up_location_address}
                                      disabled={!!disabled}
                    />
                    }
                    <LocationBlock register={register}
                                   errors={errors}
                                   label={t('Booking Confirmation/Cargo Drop Off Location')}
                                   field_name={'cargo_drop_off_location'}
                                   google_field_name={'cargo_drop_off_location_address'}
                                   google_label={true}
                                   color_label={color_label}
                                   font_weight={font_weight}
                                   label_uppercase={props.label_uppercase}
                                   default_location={props.shipment_details?.cargo_drop_off_location}
                                   default_address={props.shipment_details?.cargo_drop_off_location_address}
                                   disabled={!!disabled}
                    />
                </>
                : <LocationBlock register={register}
                                 errors={errors}
                                 label={t('Booking Confirmation/Cargo Pick Up Location')}
                                 field_name={'cargo_pick_up_location'}
                                 google_field_name={'cargo_pick_up_location_address'}
                                 google_label={true}
                                 color_label={color_label}
                                 font_weight={font_weight}
                                 label_uppercase={props.label_uppercase}
                                 default_location={props.shipment_details?.cargo_pick_up_location}
                                 default_address={props.shipment_details?.cargo_pick_up_location_address}
                                 disabled={!!disabled}
                />
            }
        </>

    )
}

export default LocationContainer