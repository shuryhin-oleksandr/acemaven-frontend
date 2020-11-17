import React, { useState } from "react";
import { Wrapper } from "../client-popup-styles";
import CargoDetails from "./CargoDetails";
import ShipperInfoContainer from "./ShipperInfoContainer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../../../_BLL/store";
import { useForm } from "react-hook-form";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import { SearchResultType } from "../../../../../_BLL/types/search/search_types";

type PropsType = {
  companyInfo: CompanyInfoType | null;
  currentUser: IAuthUserInfo | null;
  shippingValue: number;
  currentFreightRate: SearchResultType;
};

const RootShippingForm: React.FC<PropsType> = ({
  companyInfo,
  currentUser,
  shippingValue,
  currentFreightRate,
}) => {
  const [formStep, setFormStep] = useState(1);

  return (
    <Wrapper>
      <div style={{ display: formStep === 1 ? "block" : "none" }}>
        <CargoDetails
          setFormStep={setFormStep}
          formStep={formStep}
          shippingValue={shippingValue}
          currentFreightRate={currentFreightRate}
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
            currentFreightRate={currentFreightRate}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default RootShippingForm;
