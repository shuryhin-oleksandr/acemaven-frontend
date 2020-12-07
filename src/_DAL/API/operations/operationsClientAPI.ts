import instance from "../axiosConfig";

export const operationsClientAPI = {
  getClientOperations(
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
};
