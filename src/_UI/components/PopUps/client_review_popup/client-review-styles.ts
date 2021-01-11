import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
export const Inner = styled.form`
  max-width: 800px;
  width: 100%;
  background-color: white;
  position: relative;
  padding: 60px 50px 50px;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #bdbdbd;
  margin-bottom: 30px;
  padding: 0 70px;
`;
export const Title = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
export const Subtitle = styled.div`
  color: #4f4f4f;
  font-family: "Helvetica Light", sans-serif;
  font-size: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
export const ConfirmButton = styled.button`
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  max-width: 146px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: black;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
  }
`;

export const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ErrorMessage = styled.div`
  color: #e76767;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 12px;
  text-align: end;
`;