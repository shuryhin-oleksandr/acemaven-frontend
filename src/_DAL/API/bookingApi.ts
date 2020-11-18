import instance from "./axiosConfig";
import { PostBookingData } from "../../_BLL/types/bookingTypes";

export const bookingApi = {
  getReleaseTypeChoices() {
    return instance.get("/core/choices?models=release_type");
  },
  postBooking(data: PostBookingData) {
    return instance.post("/booking/booking/", data);
  },
};
