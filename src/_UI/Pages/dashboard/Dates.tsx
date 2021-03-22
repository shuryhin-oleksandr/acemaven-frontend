import React from "react";
import { DateRangePicker, DateRangePickerProps } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

import moment from "moment";
import styled from "styled-components";

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
    <Picker
      disabled={disabled}
      appearance="default"
      isoWeek={true}
      showOneCalendar={true}
      showWeekNumbers={true}
      placeholder={placeholder}
      style={{ maxWidth: width ? width : "150px" }}
      size={"lg"}
      hoverRange="week"
      ranges={[]}
      onOk={(date: any) => {
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

const Picker = styled(DateRangePicker)<DateRangePickerProps>`
  &.rs-picker-default,
  & .rs-picker-toggle.rs-btn-lg {
    height: 31px !important;
  }

  & .rs-picker-toggle-caret {
    right: 8px !important;
    top: 5px !important;
    color: #7c7c89;
    margin-left: 2px;
  }

  & .rs-picker-toggle.rs-btn-lg {
    padding-top: 5px;
    padding-bottom: 9px;
    padding-left: 10px;
  }

  & .rs-picker-toggle,
  & .rs-btn {
    background: #ececec !important;
  }

  & .rs-picker-toggle-placeholder {
    color: #7c7c89;
    font-size: 14px;
    font-family: "Helvetica Light", sans-serif;
  }
  & .rs-picker-toggle-value {
    color: #7c7c89;
    font-size: 14px;
    font-family: "Helvetica Light", sans-serif;
  }
  //here
  &.rs-picker-has-value .rs-picker-toggle .rs-picker-toggle-value {
    color: #1b1b25 !important;
  }

  & .rs-picker-toggle.rs-btn-lg {
    border-radius: 4px;
  }

  & .rs-picker-toggle {
    border-width: 0 !important;
  }
  & .rs-picker-toggle-clean {
    top: 5px !important;
  }
  &.rs-picker-disabled {
    opacity: 1 !important;
    .rs-picker-toggle {
      background-color: #ececec !important;
    }
  }
`;
