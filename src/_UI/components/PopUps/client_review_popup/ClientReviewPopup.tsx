import React, { useState } from "react";
import {
  Wrapper,
  Inner,
  Content,
  Title,
  Subtitle,
  ButtonsWrapper,
  ConfirmButton,
  StarsWrapper,
} from "./client-review-styles";
import { IconButton, withStyles } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import { Controller, useForm } from "react-hook-form";
import { FormTextarea } from "../accept_booking_popup/accept-popup-styles";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";

type PropsType = {
  setReviewPopup: (value: boolean) => void;
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#115B86",
  },
})(Rating);

const ClientReviewPopup: React.FC<PropsType> = ({ setReviewPopup }) => {
  const { handleSubmit, errors, control, reset, register } = useForm({
    reValidateMode: "onBlur",
  });

  const [ratingValue, setRatingValue] = useState(0);

  return (
    <Wrapper>
      <Inner>
        <IconButton
          onClick={() => setReviewPopup(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <Content>
          <Title>Rate and review the shipment</Title>
          <Subtitle>
            Leave your review on agent and his services. The review will be
            approved by the platform’s support team and posted on the agent
            profile page.
          </Subtitle>
          <StarsWrapper>
            <StyledRating
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(Number(newValue));
              }}
            />
          </StarsWrapper>
        </Content>

        <Controller
          name="booking_notes"
          control={control}
          defaultValue=""
          rules={{
            required: "Field is required",
          }}
          as={
            <div style={{ width: "100%", padding: "0 70px" }}>
              <FormTextarea
                error={!!errors?.booking_notes}
                placeholder="Comments.."
              />
            </div>
          }
        />
        <ButtonsWrapper>
          <ConfirmButton>submit</ConfirmButton>
        </ButtonsWrapper>
      </Inner>
    </Wrapper>
  );
};

export default ClientReviewPopup;
