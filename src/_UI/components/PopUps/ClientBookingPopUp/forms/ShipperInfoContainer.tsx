import React from "react";
import ExportShipperInfo from "./ExportShipperInfo";
import ImportShipperInfo from "./ImportShipperInfo";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { CompanyInfoType } from "../../../../../_BLL/types/profileSettingsType";
import { IAuthUserInfo } from "../../../../../_BLL/types/authTypes";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../../_BLL/store";
import { postBooking } from "../../../../../_BLL/thunks/booking_client_thunk/bookingClientThunk";

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

  const dispatch = useDispatch();

  let firstStepData = useSelector(
    (state: AppStateType) => state.booking.description_step_data
  );
  let booking_dates = useSelector(
    (state: AppStateType) => state.booking.booking_dates
  );

  let freight_rate_id = useSelector(
    (state: AppStateType) => state.booking.current_booking_freight_rate_id
  );
  // return direction === "export" ? (
  const onSubmit = (values: any) => {
    const finalData = {
      ...firstStepData,
      shipper: values,
      date_from: booking_dates?.date_from,
      date_to: booking_dates?.date_to,
      freight_rate: freight_rate_id,
    };

    console.log("finalData", finalData);
    dispatch(postBooking(finalData));
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
