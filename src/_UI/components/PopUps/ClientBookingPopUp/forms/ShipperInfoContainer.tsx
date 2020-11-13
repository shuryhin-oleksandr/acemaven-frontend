import React from "react";
import ExportShipperInfo from "./ExportShipperInfo";
import ImportShipperInfo from "./ImportShipperInfo";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import { useForm } from "react-hook-form";

type PropsType = {
  direction: string;
  setFormStep: VoidFunctionType;
  formStep: number;
  companyInfo: CompanyInfoType | null;
  currentUser: IAuthUserInfo | null;
};

const ShipperInfoContainer: React.FC<PropsType> = ({
  direction,
  setFormStep,
  formStep,
  companyInfo,
  currentUser,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
  } = useForm();

  // return direction === "export" ? (
  const onSubmit = (values: any) => {
    console.log("values part 1", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {true ? (
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
      )}
    </form>
  );
};

export default ShipperInfoContainer;
