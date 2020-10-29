import React from "react";
import ExportShipperInfo from "./ExportShipperInfo";
import ImportShipperInfo from "./ImportShipperInfo";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";

type PropsType = {
  direction: string;
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
  register: any;
  companyInfo: CompanyInfoType | null;
  currentUser: IAuthUserInfo | null;
  setValue: any;
};

const ShipperInfoContainer: React.FC<PropsType> = ({
  direction,
  control,
  setFormStep,
  formStep,
  getValues,
  register,
  companyInfo,
  currentUser,
  setValue,
}) => {
  // return direction === "export" ? (

  return true ? (
    <ExportShipperInfo
      control={control}
      setFormStep={setFormStep}
      formStep={formStep}
      register={register}
      getValues={getValues}
      companyInfo={companyInfo}
      currentUser={currentUser}
      setValue={setValue}
    />
  ) : (
    <ImportShipperInfo
      control={control}
      setFormStep={setFormStep}
      formStep={formStep}
      register={register}
      getValues={getValues}
    />
  );
};

export default ShipperInfoContainer;
