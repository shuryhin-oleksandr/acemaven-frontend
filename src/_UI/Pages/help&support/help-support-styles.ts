import styled, { keyframes } from "styled-components";

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const SupportOuter = styled.div`
  width: 100%;
  height: 100%;
  animation: ${skelet_appear} ease-in-out 0.4s;
`;
export const SupportInner = styled.div`
  width: 100%;
  padding: 51px 75px 51px 30px;
  display: flex;
  flex-direction: column;
`;

export const SupportTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
  margin-bottom: 30px;
`;

export const SupportContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const AddTopicOption = styled.div`
  width: 100%;
  background-color: white;
  border: 1px dashed #828282;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;
export const AddTopicText = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 18px;
  color: #bdbdbd;
`;
export const TopicOuter = styled.div`
  width: 100%;
  border: 1px solid #bdbdbd;
  background-color: #ffffff;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;
export const TopicInner = styled.div`
  width: 100%;
  padding: 18px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const TopicHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13.5px;
`;
export const TopicWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const TopicName = styled.div<{ color?: string }>`
  font-family: "Helvetica Bold", sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: ${({ color }) => (color ? color : "#7c7c89")};
  margin-right: 5px;
`;
export const TopicReason = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: #1b1b25;
`;
export const TopicStatus = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: #1ab8e6;
  margin-left: 6px;
`;
export const TopicDescription = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: #3b3b41;
`;

export const SupportChatHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 13.5px;
  border-bottom: 1px solid #bdbdbd;
`;

export const UnreadMessageWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const UnreadMessageTitle = styled.div<{ color?: string }>`
  font-family: "Helvetica Bold", sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: ${({ color }) => (color ? color : "#7c7c89")};
  margin-right: 5px;
`;
export const UnreadMessageCount = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: #1ab8e6; ;
`;
