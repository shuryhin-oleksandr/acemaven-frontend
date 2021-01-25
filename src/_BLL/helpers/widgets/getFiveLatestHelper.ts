import { LatestTrackingWidgetType } from "../../types/operations/operationsTypes";

export const getFiveLatestHelper = (arr: LatestTrackingWidgetType[]) => {
  if (arr.length > 5) {
    let latest = arr.slice(arr.length - 5);
    return latest;
  }
  return arr;
};
