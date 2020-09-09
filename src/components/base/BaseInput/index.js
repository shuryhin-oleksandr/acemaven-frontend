// Core
import styled from "styled-components";
import { fonts } from "../../../theming";

const BaseInput = styled.input`
  background: #ffffff;
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
`;

export default BaseInput;
