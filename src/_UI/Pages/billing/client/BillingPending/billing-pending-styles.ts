import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 80px 50px 30px;
`;

export const Heading = styled.div<{ without_margin?: boolean }>`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  line-height: 57px;
  color: #000000;
  margin-bottom: ${({ without_margin }) => (without_margin ? 0 : "30px")};
`;
