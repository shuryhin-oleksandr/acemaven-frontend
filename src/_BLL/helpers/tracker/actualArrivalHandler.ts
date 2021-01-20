import {OperationType, TrackingBackendType} from "../../types/operations/operationsTypes";
import {ShippingTypesEnum} from "../../types/rates&surcharges/newSurchargesTypes";

export const actualDepartureHelper = (operation_info: OperationType | null, manual_tracking_data: TrackingBackendType[]) => {
    if(operation_info?.automatic_tracking) {
        if(operation_info?.shipping_type === ShippingTypesEnum.SEA) {
            return !!operation_info?.tracking.filter(tr => tr.data?.data?.containers?.map((c: any) => c?.events?.map((ev: any) => ev?.status === 'VAD'))).length
        } else {
            return operation_info?.tracking.some(tr => tr.data?.events && !!tr.data?.events[0].scheduledTimeOfArrival)
        }
    } else {
        return operation_info?.tracking?.some(mt => (mt.status === 'Vessel Departed') || (mt.status === 'Aircraft Departed')) //boolean

    }
}