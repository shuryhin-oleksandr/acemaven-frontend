// Core
import styled, { css } from "styled-components";
import { Field } from "formik";
import Arrow from "../../../../_UI/assets/icons/selectArrow.svg";

const BaseFormikInput = styled(Field)`
  background-color: ${({ searchWidget }) =>
      searchWidget ? "#ececec" : "#ffffff"}
    ${({ valid }) =>
      valid &&
      css`
        background-color: #ffffff;
      `};
  ${({ error }) =>
    error &&
    css`
      background-color: #ececec;
    `};
  border: ${({ searchWidget }) =>
    searchWidget ? "none" : "1px solid #bdbdbd"};
  box-sizing: border-box;
  border-radius: 4px;
  width: ${({ width }) => (width ? width : "100%")};
  height: 40px;
  padding: 0 10px;
  outline: none;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: #bdbdbd;
  ::-webkit-input-placeholder {
    /* Edge */
    font-family: "Helvetica Reg", sans-serif;
    font-size: 14px;
    color: #bdbdbd;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: "Helvetica Reg", sans-serif;
    font-size: 14px;
    color: #bdbdbd;
  }
  ::placeholder {
    font-family: "Helvetica Reg", sans-serif;
    font-size: 14px;
    color: #bdbdbd;
  }
  //hiding inputs type number Arrows/Spinners
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: ${({ component }) =>
    component === "select" ? `url(${Arrow})` : "none"};
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%;
`;

export default BaseFormikInput;
