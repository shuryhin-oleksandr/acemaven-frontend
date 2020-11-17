import instance from "./axiosConfig";

export const bookingApi = {
  getReleaseTypeChoices() {
    return instance.get("/core/choices?models=release_type");
  },
  getAgentsBookingRequestList () {
    return instance.get('')
  },
  getBookingInfoById (id: number) {
    return instance.get('')
  },
  deleteBookingByAgent (id: number) {
    return instance.delete('')
  },
  assignAnotherAgentToBooking (user_id: number) {
    return instance.patch('', {is_assigned: true})
  }
};