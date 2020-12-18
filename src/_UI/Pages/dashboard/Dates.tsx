import React from "react";
import { DateRangePicker } from "rsuite";
import "./custom-rsuite-default.css";
import moment from "moment";

type PropsType = {
  setDates: any;
  extraDateNumber: number;
  dates: any;
  disabled?: any;
  shippingValueReset?: any;
  placeholder?: string;
  width?: string;
  openCallback?: any;
};

const Dates: React.FC<PropsType> = ({
  setDates,
  extraDateNumber,
  dates,
  disabled,
  shippingValueReset,
  placeholder,
  width,
  openCallback,
}) => {
  const { allowedRange } = DateRangePicker;
  const tillTheEnd =
    moment().endOf("week").diff(moment(), "days") + extraDateNumber;
  const disabledDate = moment().add(tillTheEnd, "days").format("YYYY-MM-DD");
  const maxDate = moment().add(90, "days").format("YYYY-MM-DD");

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
      hoverRange="week"
      ranges={[]}
      onOk={(date) => {
        setDates(date);
      }}
      disabledDate={allowedRange(disabledDate, maxDate)}
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
export default Dates;
