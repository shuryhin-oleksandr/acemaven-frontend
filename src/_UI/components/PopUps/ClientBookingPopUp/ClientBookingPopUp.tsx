import React from "react";
import {
  PopupContainer,
  PopupContent,
  Heading,
  CloseBtn,
  Form,
  HeadingFormWrapper,
  HeadingFormText,
  InputGroupName,
  ColName,
  FlexWrapper,
  RowWrapper,
  ContainerInfo,
  InputsWrapper,
} from "./client-popup-styles";
import close from "../../../assets/icons/close-icon.svg";
import BookingCard from "../../../Pages/dashboard/search/search_rate_card/BookingCard";
import { useForm } from "react-hook-form";
import CargoDetails from "./forms/CargoDetails";

const ClientBookingPopUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
  } = useForm();
  return (
    <PopupContainer>
      <PopupContent>
        <Heading>Booking process</Heading>
        <CloseBtn>
          <img src={close} alt="" />
        </CloseBtn>
        <BookingCard button_display={false} />
        <Form>
          <CargoDetails control={control} />
        </Form>
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientBookingPopUp;
