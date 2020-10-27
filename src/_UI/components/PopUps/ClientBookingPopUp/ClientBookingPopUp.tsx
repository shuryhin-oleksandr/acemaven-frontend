import React, { useState } from "react";

import {
  PopupContainer,
  PopupContent,
  Heading,
  CloseBtn,
  Form,
} from "./client-popup-styles";
import close from "../../../assets/icons/close-icon.svg";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
import { useForm } from "react-hook-form";
import CargoDetails from "./forms/CargoDetails";
import ShipperInfoContainer from "./forms/ShipperInfoContainer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";

type PropsType = {
  setBookingPopupVisible: (value: boolean) => void;
};

const ClientBookingPopUp: React.FC<PropsType> = ({
  setBookingPopupVisible,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
  } = useForm();

  let details = useSelector(
    (state: AppStateType) => state.booking.cargo_details
  );

  const [formStep, setFormStep] = useState(1);
  const onSubmit = (values: any) => {
    const finalValues = { ...values, details: details };
    console.log("finalValues", finalValues);
  };
  return (
    <PopupContainer>
      <PopupContent>
        <Heading>Booking process</Heading>
        <CloseBtn onClick={() => setBookingPopupVisible(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <BookingCard button_display={false} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {formStep === 1 ? (
            <CargoDetails
              control={control}
              setFormStep={setFormStep}
              formStep={formStep}
              getValues={getValues}
            />
          ) : (
            <ShipperInfoContainer
              direction="export"
              control={control}
              setFormStep={setFormStep}
              formStep={formStep}
              register={register}
              getValues={getValues}
            />
          )}
        </Form>
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientBookingPopUp;
