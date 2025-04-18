import styled, { keyframes } from "styled-components";

type PropsStyles = {
  checked?: any;
  active?: any;
  padding?: string;
};

let shown = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const ArrowWrap = styled.div<{ isHover?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: ${({ isHover }) =>
    isHover ? "rgba(255, 255, 255, .3)" : "transparent"};
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transition: 0.3s;
  }
`;
export const Arrow = styled.div<{ isHover?: boolean; isSmallBar?: boolean }>`
  clip-path: polygon(57% 0, 100% 50%, 57% 100%, 40% 100%, 85% 50%, 40% 0);
  background-color: ${({ isHover }) =>
    isHover ? "#00c5ff" : "rgba(255, 255, 255, .3)"};
  width: 18px;
  height: 18px;
  transition: 0.3s;
  transform: ${({ isSmallBar }) => (!isSmallBar ? "rotate(180deg)" : "none")};
`;

export const NavContainer = styled.div`
  max-width: 230px;
  width: 100%;
  min-width: 210px;
  background-color: black;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 5px;
  padding-top: 30px;
  animation: ${shown} ease-in-out 0.5s;
`;

export const NavSmallContainer = styled.div`
  width: 50px;
  background-color: black;
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 5px;
  padding-top: 30px;
  //animation: ${shown} ease-in-out .5s;
`;
export const ChatExtension = styled.div`
  width: 200px;
  background-color: #3b3b41;
  color: white;
  padding-top: 50px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 15px;
  line-height: 17.2px;
  padding-left: 10px;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:hover {
    cursor: pointer;
  }
`;
export const ChatLinkWrap = styled.div`
  width: 100%;
  margin-bottom: 35px;

  a {
    text-decoration: none;
    color: #ffffff;
    transition: 0.5s;
  }
  a:hover {
    text-decoration: none;
    color: #00c5ff;
    transition: 0.5s;
  }
  a:active {
    text-decoration: none;
    color: #00c5ff;
    transition: 0.5s;
  }
`;

export const NavButton = styled.button<{ add_color?: boolean }>`
font-family: "Helvetica ExtraReg", sans-serif;
  outline: none;
  border: none;
  background: none;
  color: ${({ add_color }) => (add_color ? "#00C5FF" : "#ffffff")};
  transition: 0.4s;

  &:hover {
    cursor: pointer;
    transition: 0.4s;
    color: #00c5ff;
  }
`;

export const LinkWrap = styled.div`
padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //min-height: 60px;
  &:hover {
    cursor: pointer;
  }
`;
export const Outer = styled.div`
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.div<PropsStyles>`
  font-family: "Helvetica ExtraReg", sans-serif;
  font-size: 15px;
  color: ${({ checked }) => (checked ? "#00C5FF" : "white")};
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 0;
  margin: 0;
  letter-spacing: 0.7px;
`;
export const IconWrap = styled.div<PropsStyles>`
  width: 50px;
  display: flex;
  padding: ${({ padding }) => (padding ? padding : "0 20px 0 10px")};
  align-items: center;
  justify-content: flex-start;
`;
export const NestedOuter = styled.div`
  animation: ${shown} ease-in-out 0.3s;
  width: 100%;
`;

export const NestedWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 45px;
  
    &:first-child {
    margin-top: 15px;
  }
  &:last-child {
    margin-bottom: -15px;
  }

  a {
    width: 100%;
    display: flex;
    height: 100%;
    text-decoration: none;
  }
  &:hover {
    cursor: pointer;
  }
  text-transform: uppercase;
`;
export const NestedName = styled.div<PropsStyles>`
  width: 100%;
  padding: 0 10px 0 55px;
  color: ${({ active }) => (active ? "#00C5FF" : "white")};
  font-family: "Helvetica ExtraReg", sans-serif;
  font-size: 15px;
  transition: 0.2s;
    letter-spacing: 0.7px;

  &:hover {
    color: #00c5ff;
    transition: 0.2s;
  }
`;
