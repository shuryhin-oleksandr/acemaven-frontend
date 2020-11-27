import instance from "../axiosConfig";
import { BookingShipmentDetailsType } from "../../../_BLL/types/bookingTypes";

export const operationsAgentAPI = {
  getAgentsOperations(
    type: string,
    is_mine: boolean | string,
    field_name: string,
    search_column: string,
    search_value: string
  ) {
    return instance.get(
      `/booking/operation/?shipping_type=${type}&my_operations=${is_mine}&ordering=${field_name}&${search_column}=${search_value}`
    );
  },
  getAgentExactOperation(id: number) {
    return instance.get(`/booking/operation/${id}/`);
  },
  confirmBookingRequest(data: BookingShipmentDetailsType) {
    return instance.post("/booking/shipment-details/", data);
  },
};

// `/booking/booking/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`
