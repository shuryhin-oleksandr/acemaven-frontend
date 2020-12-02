import React, { useState } from "react";
import {
  ButtonsWrap,
  CancelButton,
  CancelTitle,
  CloseBtn,
  PopupContainer,
  PopupContent,
  Heading,
  HeadingText,
  HeadingWrap,
} from "./change-request-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";
import {
  SectionTitle,
  SectionWrapper,
} from "../../../Pages/operations/agent/ExactOperationContainer/OperationCard/operation-card-style";
import {
  CalendarIcon,
  CardContent,
  GeneralBookingContent,
  InfoRow,
  InfoRowLabel,
} from "../../../Pages/Requests/Booking_agent/booking_card/booking-card-style";
import SurchargeRateSelect from "../../_commonComponents/select/SurchargeRateSelect";
import FormField from "../../_commonComponents/Input/FormField";
import { DocumentationCol } from "../ClientBookingPopUp/client-popup-styles";
import calendar_icon from "../../../assets/icons/date_1.svg";
import Dates from "../../../Pages/dashboard/Dates";

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
};

const ClientOperationChangeRequestPopUp: React.FC<PropsTypes> = ({
  setIsOpen,
}) => {
  const [dates, setDates] = useState([]);
  return (
    <PopupContainer>
      <PopupContent>
        <CloseBtn onClick={() => setIsOpen(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <HeadingWrap>
          <Heading>Requesting changes</Heading>
          <HeadingText>
            This action should recalculate the charges shown in the operation
            based on the new changes.
          </HeadingText>
        </HeadingWrap>
        <SectionWrapper>
          <SectionTitle>Documents</SectionTitle>
          <div style={{ display: "flex" }}>
            <InfoRow margin_right="25px">
              <InfoRowLabel>Release type</InfoRowLabel>
              <SurchargeRateSelect
                options={[{ id: 1, title: 123 }]}
                // error={errors?.release_type?.message}
                placeholder="Release type"
              />
            </InfoRow>
            <InfoRow>
              <InfoRowLabel>NUMBER OF DOCUMENTS</InfoRowLabel>
              <div style={{ paddingTop: "8px" }}>
                <FormField
                  // inputRef={register({
                  //   required: "Field is required",
                  // })}
                  placeholder="No. of Documents"
                  name="number_of_documents"
                  // getValues={getValues}
                  defaultValue={1}
                  // error={errors?.number_of_documents}
                />
              </div>
            </InfoRow>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle>DATES</SectionTitle>
          <GeneralBookingContent>
            <div style={{ display: "flex" }}>
              <CalendarIcon style={{ width: "87px", height: "96px" }}>
                <img src={calendar_icon} alt="" />
              </CalendarIcon>
              <InfoRow margin_right="50px" margin_bottom="0px">
                <InfoRowLabel>SHIPMENT DATE</InfoRowLabel>
                <Dates
                  setDates={setDates}
                  // extraDateNumber={}
                  extraDateNumber={"sea" === "sea" ? 9 : 2}
                  dates={dates}
                  disabled={false}
                />
              </InfoRow>
            </div>
          </GeneralBookingContent>
        </SectionWrapper>
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientOperationChangeRequestPopUp;
