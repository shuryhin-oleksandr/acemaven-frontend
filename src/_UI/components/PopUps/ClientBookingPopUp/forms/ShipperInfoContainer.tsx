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
  watch: any;
  currentUser: IAuthUserInfo | null;
};

const ShipperInfoContainer: React.FC<PropsType> = ({
  direction,
  control,
  setFormStep,
  formStep,
  getValues,
  register,
  companyInfo,
  watch,
  currentUser,
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
      watch={watch}
      currentUser={currentUser}
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
