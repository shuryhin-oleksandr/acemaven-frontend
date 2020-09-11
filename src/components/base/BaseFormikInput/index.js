// Core
import styled, { css } from "styled-components";
import { fonts } from "../../../theming";
import { Field } from "formik";

const BaseFormikInput = styled(Field)`
  background-color: #ffffff;
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
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  outline: none;
  ${fonts.asap(14, 16)};
  color: #bdbdbd;
  ::-webkit-input-placeholder {
    /* Edge */
    ${fonts.asap(14, 16)};
    color: #bdbdbd;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    ${fonts.asap(14, 16)};
    color: #bdbdbd;
  }
  ::placeholder {
    ${fonts.asap(14, 16)};
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
`;

export default BaseFormikInput;
