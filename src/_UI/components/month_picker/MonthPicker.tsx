import React from "react";
import { DateRangePicker } from "rsuite";

import moment from "moment";

type PropsType = {
  setDates: any;
  dates: any;
  disabled?: any;
  shippingValueReset?: any;
  placeholder?: string;
  width?: string;
  openCallback?: any;
};

const MonthPicker: React.FC<PropsType> = ({
  setDates,
  dates,
  disabled,
  shippingValueReset,
  placeholder,
  width,
  openCallback,
}) => {
  const { allowedRange } = DateRangePicker;

  const minDate = moment().subtract(1, "years").format("YYYY-MM-DD");
  const maxDate = moment().format("YYYY-MM-DD");

  return (
    <DateRangePicker
      disabled={disabled}
      appearance="default"
      isoWeek={true}
      showOneCalendar={true}
      showWeekNumbers={true}
      placeholder={placeholder}
      style={{ width: width ? width : "150px" }}
      size={"lg"}
      hoverRange="month"
      oneTap
      ranges={[]}
      onChange={(date) => {
        setDates(date);
      }}
      disabledDate={allowedRange(minDate, maxDate)}
      value={dates}
      onClean={() => {
        setDates([]);
        shippingValueReset && shippingValueReset();
      }}
      onOpen={() => {
        openCallback && openCallback();
      }}
    />
  );
};
export default MonthPicker;
