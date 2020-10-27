import React from "react";
import ExportShipperInfo from "./ExportShipperInfo";
import ImportShipperInfo from "./ImportShipperInfo";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";

type PropsType = {
  direction: string;
  control: any;
  setFormStep: VoidFunctionType;
  formStep: number;
  getValues: any;
  register: any;
};

const ShipperInfoContainer: React.FC<PropsType> = ({
  direction,
  control,
  setFormStep,
  formStep,
  getValues,
  register,
}) => {
  // return direction === "export" ? (

  return true ? (
    <ExportShipperInfo
      control={control}
      setFormStep={setFormStep}
      formStep={formStep}
      register={register}
      getValues={getValues}
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
