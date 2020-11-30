import React from "react";
import { DateRangePicker } from "rsuite";
import "./custom-rsuite-default.css";
import moment from "moment";

type PropsType = {
  setDates: any;
  extraDateNumber: number;
  dates: any;
  disabled?: any;
  shippingValueReset: any;
};

const Dates: React.FC<PropsType> = ({
  setDates,
  extraDateNumber,
  dates,
  disabled,
  shippingValueReset,
}) => {
  const { combine, before, after } = DateRangePicker;
  const tillTheEnd =
    moment().endOf("week").diff(moment(), "days") + extraDateNumber;
  const disabledDate = moment().add(tillTheEnd, "days").format("MM-DD-YYYY");
  const maxDate = moment().add(90, "days").format("MM-DD-YYYY");

  return (
    <DateRangePicker
      disabled={disabled}
      appearance="default"
      isoWeek={true}
      showOneCalendar={true}
      showWeekNumbers={true}
      placeholder={"Shipment date"}
      style={{ width: "150px" }}
      size={"lg"}
      hoverRange="week"
      ranges={[]}
      onOk={(date) => {
        setDates(date);
      }}
      disabledDate={combine(before(disabledDate), after(maxDate))}
      value={dates}
      onClean={() => {
        setDates([]);
        shippingValueReset();
      }}
    />
  );
};
export default Dates;
