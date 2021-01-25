import {ShippingTypesEnum} from "../../types/rates&surcharges/newSurchargesTypes";
import {OperationType} from "../../types/operations/operationsTypes";

export const autoTrackWithEventsHelper = (operations_list: OperationType[]) => {
    let operations_with_auto_tracking = operations_list.filter(o => o.tracking?.length > 0 && o.automatic_tracking)
    let operations_for_drawing_on_map = operations_with_auto_tracking.filter(o => (o.shipping_type === ShippingTypesEnum.AIR)
        ? o.tracking[0].data.events?.length > 0 && o
        : o.tracking[0].data.data.locations?.length > 0 && o)

    let events = operations_for_drawing_on_map.map(o => ({
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
    return events
}