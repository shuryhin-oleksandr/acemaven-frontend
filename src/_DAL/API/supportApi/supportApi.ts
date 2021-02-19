import instance from "../axiosConfig";
import { TicketType } from "../../../_BLL/types/support_types/support_types";

export const supportApi = {
  getTicketsList() {
    return instance.get("/websockets/ticket/");
  },

  getCategoryChoices() {
    return instance.get("/core/choices/?models=ticket_category");
  },

  postNewTicket(data: TicketType) {
    return instance.post("/websockets/ticket/", data);
  },
  getExactTicket(id: number) {
    return instance.get(`/websockets/ticket/${id}/`);
  },
};
