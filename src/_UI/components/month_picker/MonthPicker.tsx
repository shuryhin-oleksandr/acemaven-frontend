import React from "react";
import { DateRangePicker, DateRangePickerProps } from "rsuite";

import moment from "moment";
import styled from "styled-components";

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
    <StyledPicker
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
      onChange={(date: any) => {
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

const StyledPicker = styled(DateRangePicker)<DateRangePickerProps>`
  &.rs-picker-default,
  & .rs-picker-toggle.rs-btn-lg {
    height: 40px !important;
  }

  & .rs-picker-toggle-caret {
    right: 8px !important;
    top: 8px !important;
    color: #7c7c89;
    margin-left: 2px;
  }

  & .rs-picker-toggle.rs-btn-lg {
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 10px;
  }

  & .rs-picker-toggle,
  & .rs-btn {
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
    border: 1px solid #bdbdbd !important;
  }
  & .rs-picker-toggle-clean {
    top: 8px !important;
  }
  &.rs-picker-disabled {
    opacity: 1 !important;
    .rs-picker-toggle {
      background-color: #ececec !important;
    }
  }
`;
