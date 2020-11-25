import instance from "../axiosConfig";
import {BookingShipmentDetailsType} from "../../../_BLL/types/bookingTypes";

export const operationsAgentAPI = {
    getAgentsOperations (value: boolean | string) {
        return instance.get(`/booking/operation/?my_operations=${value}`)
    },
    getAgentExactOperation (id: number) {
        return instance.get(`/booking/operation/${id}/`)
    },
    confirmBookingRequest (data: BookingShipmentDetailsType) {
        return instance.post('/booking/shipment-details/', data)
    }
}