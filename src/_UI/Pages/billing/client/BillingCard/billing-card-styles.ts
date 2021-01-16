import styled from "styled-components";
import React from "react";
import { AcceptButton } from "../../../Requests/Booking_agent/booking_card/booking-card-style";

export const MapWrapper = styled.div`
  width: 288px;
  height: 100%;
`;

export const CardContainer = styled.div`
  padding: 20px 25px;
  border: 1px solid #ececec;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: flex;
  margin-bottom: 20px;
`;

export const InformationWrapper = styled.div`
  padding-left: 15px;
  flex: 1;
`;

export const Route = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  > div {
    font-family: "Helvetica Reg", sans-serif;
    font-size: 18px;
    line-height: 21px;
    text-transform: uppercase;
    color: #1b1b25;
    margin-left: 10px;
  }
`;

export const MainInfo = styled.div``;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

export const InfoTitle = styled.span`
  font-family: "Helvetica bold", sans-serif;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;
  color: #115b86;
  margin-right: 10px;
`;

export const InfoText = styled.span`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #1b1b25;
`;

export const ChargesBlock = styled.div`
  padding-top: 20px;
  display: flex;
  width: 70%;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ChargeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding: 7px 0;
`;
export const ChargeTitle = styled.span`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-transform: capitalize;
  color: #1b1b25;
`;
export const ChargeValue = styled.span`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  text-transform: uppercase;
  color: #1b1b25;
`;

export const ToBookText = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: #828282;
  position: absolute;
  top: -15px;
`;

export const ConfirmButton = styled.button`
  height: 40px;
  padding: 12px 40px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: rgba(0, 0, 0, 0.6);
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const RejectButton = styled.button`
  height: 40px;
  padding: 0 39px;
  outline: none;
  border: 1px solid #3b3b41;
  background: none;
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.07);
  }
`;
