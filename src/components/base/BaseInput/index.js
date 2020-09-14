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
  ${fonts.helveticaNeu(14, 16, 0, 300)};
  color: #bdbdbd;
  ::-webkit-input-placeholder {
    /* Edge */
    ${fonts.helveticaNeu(14, 16, 0, 300)};
    color: #bdbdbd;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    ${fonts.helveticaNeu(14, 16, 0, 300)};
    color: #bdbdbd;
  }

  ::placeholder {
    ${fonts.helveticaNeu(14, 16, 0, 300)};
    color: #bdbdbd;
  }
`;

export default BaseInput;
