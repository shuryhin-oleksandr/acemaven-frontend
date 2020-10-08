import styled from "styled-components";
import {SearchButton} from "../buttons/table_search_button/table-search-button-style";


export const TemplateWrap = styled.div`
  .template-message {
    display: none;
  }

  &:hover {
    cursor: pointer;
    .template-message {
      padding: 15px;
      max-width: 320px;
      width: 100%;
      border-radius: 5px;
      display: flex;
      right: -5%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.6);
      .message {
        color: white;
        font-family: "Helvetica Reg", sans-serif;
        font-size: 14px;
      }
    }
  }
`;

export const TemplateIcon = styled(SearchButton)`
  &:hover {
    cursor: pointer;
  }
`;
