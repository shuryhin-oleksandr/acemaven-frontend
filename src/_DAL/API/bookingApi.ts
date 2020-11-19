import instance from "./axiosConfig";
import { PostBookingData } from "../../_BLL/types/bookingTypes";

export const bookingApi = {
  getReleaseTypeChoices() {
    return instance.get("/core/choices?models=release_type");
  },
  postBooking(data: PostBookingData) {
    return instance.post("/booking/booking/", data);
  },

  //agents
  getAgentsBookingRequestList(
    type: string,
    field_name: string,
    search_column: string,
    search_value: string
  ) {
    return instance.get(
      `&shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`
    );
  },
  getAgentBookingInfoById(id: number) {
    return instance.get("");
  },
  deleteBookingByAgent(id: number) {
    return instance.delete("");
  },
  acceptBookingByAgent(data: any) {
    return instance.post("");
  },
  assignAnotherAgentToBooking(user_id: number) {
    return instance.patch("", { is_assigned: true });
  },
};
