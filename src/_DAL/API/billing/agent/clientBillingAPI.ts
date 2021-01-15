import instance from "../../axiosConfig";

export const clientBillingApi = {
  getClientBillingOperations(
    type: string,
    status: string,
    date_from: string,
    date_to: string
  ) {
    return instance.get(
      `/booking/billing/?shipping_type=${type}&status=${status}&date_from=${date_from}&date_to=${date_to}`
    );
  },
};
