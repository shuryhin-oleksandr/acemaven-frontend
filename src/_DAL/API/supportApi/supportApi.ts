import instance from "../axiosConfig";

export const supportApi = {
  getTicketsList() {
    return instance.get("/websockets/ticket/");
  },
};
