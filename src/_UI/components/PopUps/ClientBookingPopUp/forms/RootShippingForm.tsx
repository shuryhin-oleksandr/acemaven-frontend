import React, { useState } from "react";
import { Form } from "../client-popup-styles";
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
};

const RootShippingForm: React.FC<PropsType> = ({
  companyInfo,
  currentUser,
}) => {
  const [formStep, setFormStep] = useState(1);
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
  const onSubmit = (values: any) => {
    const finalValues = { ...values, details: details };
    console.log("finalValues", finalValues);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formStep === 1 ? (
        <CargoDetails
          control={control}
          setFormStep={setFormStep}
          formStep={formStep}
          getValues={getValues}
          register={register}
          setValue={setValue}
        />
      ) : (
        <ShipperInfoContainer
          direction="export"
          control={control}
          setFormStep={setFormStep}
          formStep={formStep}
          register={register}
          getValues={getValues}
          companyInfo={companyInfo}
          currentUser={currentUser}
          setValue={setValue}
        />
      )}
    </Form>
  );
};

export default RootShippingForm;
