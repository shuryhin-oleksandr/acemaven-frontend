import styled from "styled-components";

export const RelativeWrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 20px 30px 12px 30px;
  max-height: 500px;
  overflow: scroll;
  max-width: 800px;
  width: 100%;
  margin-bottom: 15px;
`;

export const Heading = styled.h1`
  margin: 0;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 7px;
  font-size: 30px;
  line-height: 36px;
  font-family: "Helvetica Bold", sans-serif;
`;

export const FieldWrapper = styled.div`
  margin-right: 13px;
  width: 18%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 25px;
  right: 30px;
`;

export const AddImg = styled.img`
  margin-right: 10px;
  cursor: pointer;
`;

export const RemoveImg = styled.img`
  cursor: pointer;
`;
