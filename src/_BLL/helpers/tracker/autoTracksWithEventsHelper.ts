import {ShippingTypesEnum} from "../../types/rates&surcharges/newSurchargesTypes";
import {OperationType} from "../../types/operations/operationsTypes";


export const autoTrackWithEventsHelper = (operations_list: any) => {
    let operations_with_auto_tracking = operations_list.filter((o: any) => o.tracking?.length > 0 && o.automatic_tracking)
    let operations_for_drawing_on_map = operations_with_auto_tracking.filter((o: any) => (o.shipping_type === ShippingTypesEnum.AIR)
        ? o.tracking[0].data.events?.length > 0 && o
        : o.tracking[0].data?.data.locations?.length > 0 && o)

    return operations_for_drawing_on_map.map((o: any) => ({
        ...o.tracking_initial,
        locations: o.shipping_type === ShippingTypesEnum.AIR
            ? o.tracking?.map((ot: any) => ot?.data?.events.map((e: any) => ({
                lat: e.ecefLatitude,
                lng: e.ecefLongitude
            })))[0]
            : o.tracking.map((ot: any) =>  ot.data.data.locations.map((l: any) => (l && {
                lat: l.lat,
                lng: l.lng
            })))[0]
    }))

}

export const manualTrackWithEventsHelper = (operations_list: any) => {
    let operations_with_tracking = operations_list.filter((o: any) => o.tracking?.length > 0 && !o.automatic_tracking)
    return operations_with_tracking.map((o:OperationType) => ({
        ...o.tracking_initial,
        date_of_departure: o.shipment_details && o.shipment_details[0].date_of_departure,
        date_of_arrival: o.shipment_details && o.shipment_details[0].date_of_arrival,
        actual_date_of_departure: o.shipment_details && o.shipment_details[0].actual_date_of_departure,
        actual_date_of_arrival: o.shipment_details && o.shipment_details[0].actual_date_of_arrival
    }))

}