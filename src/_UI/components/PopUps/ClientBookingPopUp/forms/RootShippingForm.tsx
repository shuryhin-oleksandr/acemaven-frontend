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
  quote_dates?: {date_from: string, date_to: string},
  quotes_mode?: boolean,
};

const RootShippingForm: React.FC<PropsType> = ({
  companyInfo,
  currentUser,
  shippingValue,
  currentFreightRate,
  quote_dates,
  ...props
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
          quotes_mode={props.quotes_mode}
        />
      </div>
      <div style={{ display: formStep === 2 ? "block" : "none" }}>
        {companyInfo && (
          <ShipperInfoContainer
            setFormStep={setFormStep}
            formStep={formStep}
            companyInfo={companyInfo}
            currentUser={currentUser}
            currentFreightRate={currentFreightRate}
            quote_dates={quote_dates}
            quotes_mode={props.quotes_mode}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default RootShippingForm;
