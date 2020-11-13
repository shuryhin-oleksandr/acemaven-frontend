import React, { useState } from "react";
import { Wrapper } from "../client-popup-styles";
import CargoDetails from "./CargoDetails";
import ShipperInfoContainer from "./ShipperInfoContainer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../../_BLL/store";
import { useForm } from "react-hook-form";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";

type PropsType = {
  companyInfo: CompanyInfoType | null;
  currentUser: IAuthUserInfo | null;
  shippingValue: number;
};

const RootShippingForm: React.FC<PropsType> = ({
  companyInfo,
  currentUser,
  shippingValue,
}) => {
  const [formStep, setFormStep] = useState(1);
  let cargo_groups = useSelector(
    (state: AppStateType) => state.booking.current_booking_cargo_groups
  );

  return (
    <Wrapper>
      <div style={{ display: formStep === 1 ? "block" : "none" }}>
        <CargoDetails
          setFormStep={setFormStep}
          formStep={formStep}
          shippingValue={shippingValue}
        />
      </div>
      <div style={{ display: formStep === 2 ? "block" : "none" }}>
        {companyInfo && (
          <ShipperInfoContainer
            direction="export"
            setFormStep={setFormStep}
            formStep={formStep}
            companyInfo={companyInfo}
            currentUser={currentUser}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default RootShippingForm;
