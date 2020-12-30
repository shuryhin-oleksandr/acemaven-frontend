import instance from "../axiosConfig";
import { BookingShipmentDetailsType } from "../../../_BLL/types/bookingTypes";


export const operationsAgentAPI = {
  getAgentsOperations(
    type: string,
    is_mine: boolean | string,
    field_name: string,
    search_column: string,
    search_value: string,
    status?: string
  ) {
    return instance.get(
      `/booking/operation/?shipping_type=${type}&my_operations=${is_mine}&ordering=${field_name}&${search_column}=${search_value}&status=${status}`
    );
  },
  getAgentExactOperation(id: number) {
    return instance.get(`/booking/operation/${id}/`);
  },
  confirmBookingRequest(data: BookingShipmentDetailsType) {
    return instance.post("/booking/shipment-details/", data);
  },
  editOperationByAgent(data: any, id: number) {
    return instance.patch(`/booking/shipment-details/${id}/`, data);
  },
  editOperationPaymentDueByAgent (data: any, id: number) {
    return instance.patch(`/booking/operation/${id}/`, data);
  },
  getCancellationChoices(){
    return instance.get("/core/choices/?models=cancellation_reason")
  },
  cancelOperationByAgent (id: number, data: {reason: string, comment?: string}) {
    return instance.post(`/booking/operation/${id}/cancel/`, data)
  },
  confirmChangeRequest (id: number) {
    return instance.post(`/booking/operation/${id}/confirm_change_request/`)
  },
  cancelChangeRequest (id: number) {
    return instance.post(`/booking/operation/${id}/cancel_change_request/`, {})
  },
  getTrackingStatusOptions(type: number, direction: string){
    return instance.get(`/booking/track-status/?shipping_mode=${type}&direction=${direction}`)
  },
  updateShipmentInfo(data:any){
    return instance.post(`/booking/track/`, data)
  }

};

// `/booking/booking/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`
