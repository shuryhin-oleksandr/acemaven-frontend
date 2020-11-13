import instance from "./axiosConfig";

export const bookingApi = {
  getReleaseTypeChoices() {
    return instance.get("/core/choices?models=release_type");
  },
};