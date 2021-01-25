import instance from "../axiosConfig";

export const operationsClientAPI = {
  getClientOperations(
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
  editOperationByClient(data: any) {
    return instance.post(`/booking/operation/`, data);
  },
  getPackageChoices() {
    return instance.get(
      "/core/choices/?models=packaging_type,container_type_air"
    );
  },
  calculateWM(calculation_values: any) {
    return instance.post("/booking/calculate/", calculation_values);
  },
  cancelOperation(id: number) {
    return instance.post(`/booking/operation/${id}/cancel/`);
  },
  recalculateCharges(id: number, data: any) {
    return instance.post(`/booking/operation/${id}/recalculate/`, data);
  },
  postCompaniesRating(
    data: {
      comment: string;
      rating: number;
    },
    id: number
  ) {
    return instance.post(`booking/operation/${id}/review/`, data);
  },
  getLatestTrackingWidgetData(){
    return instance.get("/booking/track/widget/");
  }
};
