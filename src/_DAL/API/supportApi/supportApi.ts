import instance from "../axiosConfig";

export const supportApi = {
  getTicketsList() {
    return instance.get("/websockets/ticket/");
  },

  getCategoryChoices() {
    return instance.get("/core/choices/?models=ticket_category");
  },
};
