import React, { useState } from "react";
import { Wrapper } from "../client-popup-styles";
import CargoDetails from "./CargoDetails";
import ShipperInfoContainer from "./ShipperInfoContainer";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import { SearchResultType } from "../../../../../_BLL/types/search/search_types";

type PropsType = {
  companyInfo: CompanyInfoType | null;
  currentUser: IAuthUserInfo | null;
  shippingValue: number;
  currentFreightRate: SearchResultType;
  quote_dates?: {date_from: string, date_to: string}
};

const RootShippingForm: React.FC<PropsType> = ({
  companyInfo,
  currentUser,
  shippingValue,
  currentFreightRate,
  quote_dates
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
          quotes_mode={true}
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
            quote_dates={quote_dates}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default RootShippingForm;
