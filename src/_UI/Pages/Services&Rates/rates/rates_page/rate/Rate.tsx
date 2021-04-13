import React, { useEffect, useState } from "react";
//material ui
import { IconButton } from "@material-ui/core";
//lodash
import _ from "lodash";
//react hook form
import { Controller } from "react-hook-form";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//types
import {
  ContainerType,
  RateInfoType,
} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {
  AdditionalSurchargeType,
  SurchargeInfoType,
} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//BLL
import {
  addNewSurchargeForRate,
  editRates,
} from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {
  getEditSuccess,
  getEmptyExistingSurcharge,
  getRateStartDate,
} from "../../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import { rateActions } from "../../../../../../_BLL/reducers/surcharge&rates/rateReducer";
//COMPONENTS
import ExistingRatesTable from "./ExistingRatesTable";
import SurchargesToRate from "../../register_new_freight_rate/tables/SurchargesToRate";
import NoSurchargeForRatePopup from "../../../../../components/PopUps/no_surharge_for_rate_popup/NoSurchargeForRatePopup";
import ModalWindow from "../../../../../components/_commonComponents/ModalWindow/ModalWindow";
import RegisterSurchargePopUp from "../../../../../components/PopUps/RegisterSurchargePopUp/RegisterSurchargePopUp";
//styles
import {
  RateContainer,
  Wrap,
  RateTitle,
  ButtonsWrap,
  PauseImg,
  ShippingMode,
  InfoWrap,
  RouteName,
  Content,
  FieldOuter,
  FieldsWrap,
  Label,
  PauseButton,
} from "./exact-rate-styles";
import { SaveButton } from "../../../surcharge/surcharges_page/surcharge/surcharge-style";
//icons
import pause from "../../../../../assets/icons/rates&services/pause.svg";
import play from "../../../../../assets/icons/rates&services/play_icon.svg";
import ship from "../../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../../../assets/icons/rates&services/plane-surcharge.svg";
import close_icon from "../../../../../assets/icons/close-icon.svg";
import {useTranslation} from "react-i18next";

type PropsType = {
  is_active: boolean;
  rate: RateInfoType | null;
  id: number;
  handleSubmit: any;
  errors: any;
  setValue: any;
  control: any;
  getValues: any;
  activateRateHandler: (id: any, value: boolean, history: any) => void;
  getSurchargeForRate: any;
  getSurchargeForNewRate: any;
  existing_surcharge: SurchargeInfoType | null;
  history: any;
  usage_fees: ContainerType[];
  charges: AdditionalSurchargeType[];
};

const Rate: React.FC<PropsType> = ({
  is_active,
  rate,
  handleSubmit,
  errors,
  setValue,
  control,
  getValues,
  activateRateHandler,
  getSurchargeForRate,
  existing_surcharge,
  history,
  getSurchargeForNewRate,
  usage_fees,
  charges,
}) => {
  //local state
  const [formMode, setFormMode] = useState(false);
  const [noSurchargePopup, setNoSurchargePopup] = useState(false);
  //попап для нового сюрчарджа ( new surcharge popup )
  const [newSurchargePopUpVisible, setNewSurchargePopUpVisible] = useState(
    false
  );
  console.log("existing_surcharge", existing_surcharge);
  //data from store
  let edit_success = useSelector(getEditSuccess);
  const empty_surcharge = useSelector(getEmptyExistingSurcharge);
  const rate_start_date = useSelector(getRateStartDate);

  useEffect(() => {
    if (rate && rate.rates.length > 1) {
      rate.rates.map((r) => {
        setValue(`rates.${r.id}.from`, r.start_date);
        setValue(`rates.${r.id}.to`, r.expiration_date);
      });
    } else {
      rate &&
        setValue(`rates.from`, rate.rates[0].start_date) &&
        setValue(`rates.to`, rate.rates[0].expiration_date);
    }
  }, [rate, setValue]);

  let not_empty_rates_from_server = rate?.rates?.filter(
    (r) => r.rate && r.start_date && r.expiration_date
  );
  let rates_from_server = not_empty_rates_from_server?.map((r) => ({
    id: r.id,
    rate: r.rate,
    currency: r.currency.id,
    container_type: r.container_type ? r.container_type.id : null,
    date_updated: r.date_updated,
    updated_by: r.updated_by,
    from: r.start_date ? r.start_date : "",
    to: r.expiration_date ? r.expiration_date : "",
  }));

  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    let rates: any[] = [];

    values.rates &&
      Object.keys(values.rates).forEach(
        (key: any) =>
          values.rates[key] !== null &&
          values.rates[key].from !== null &&
          rates.push({ id: Number(key), ...values.rates[key] })
      );

    let rates_to_submit =
      rates_from_server &&
      _.differenceWith(rates, rates_from_server, _.isEqual);
    let to_submit = rates_to_submit?.map((r) => ({
      id: r.id,
      rate: _.ceil(r.rate, 2),
      currency: r.currency,
      container_type: r.container_type ?? null,
      date_updated: r.date_updated,
      updated_by: r.updated_by,
      start_date: r.from,
      expiration_date: r.to,
    }));

    //check surcharges
    let ifNotAllContainersHaveSurcharges = to_submit?.some((r) => {
      const checkedRate = rate?.rates?.find((sr) => sr.id === r.id);
      return checkedRate?.surcharges.length === 0;
    });

    !ifNotAllContainersHaveSurcharges &&
      to_submit &&
      to_submit.length > 0 &&
      dispatch(editRates(Number(rate?.id), to_submit, history));
  };

  const createNewSurcharge = (data: any) => {
    dispatch(addNewSurchargeForRate(data));
  };

  useEffect(() => {
    if (edit_success) {
      setFormMode(false);
      dispatch(rateActions.setEditSuccess(""));
    }
  }, [edit_success, dispatch]);

  useEffect(() => {
    if (empty_surcharge) {
      setNoSurchargePopup(true);
    }
  }, [empty_surcharge]);
  const {t} = useTranslation();
  return (
    <RateContainer onSubmit={handleSubmit(onSubmit)}>
      <IconButton
        onClick={() => history.push("/services/rates")}
        style={{ position: "absolute", top: "10px", right: "30px" }}
      >
        <img src={close_icon} alt="" style={{ width: "15px" }} />
      </IconButton>
      <ModalWindow isOpen={noSurchargePopup}>
        <NoSurchargeForRatePopup
          setNoSurchargePopup={setNoSurchargePopup}
          setNewSurchargePopUpVisible={setNewSurchargePopUpVisible}
        />
      </ModalWindow>
      <ModalWindow isOpen={newSurchargePopUpVisible}>
        <RegisterSurchargePopUp
          setIsOpen={setNewSurchargePopUpVisible}
          rate_start_date={rate_start_date}
          popUpShippingMode={rate?.shipping_mode}
          mode={String(rate?.shipping_type)}
          shippingValue={Number(rate?.shipping_mode.id)}
          popUpCarrier={rate?.carrier}
          is_local_port={rate?.origin ? rate.origin : null}
          destination_port_value={rate?.destination ? rate.destination : null}
          usageFees={usage_fees}
          additional={charges}
          createNewSurcharge={createNewSurcharge}
          existing_surcharge={existing_surcharge ? existing_surcharge : null}
        />
      </ModalWindow>
      <Wrap>
        <RateTitle>{t("Freight rates/Freight rates")}</RateTitle>
        <ButtonsWrap>
          {formMode && <SaveButton type="submit">{("My Profile/SAVE CHANGES")}</SaveButton>}
          <PauseButton
            type="button"
            onClick={() =>
              activateRateHandler(rate?.id, !rate?.is_active, history)
            }
          >
            <PauseImg src={is_active ? pause : play} alt="" />
          </PauseButton>
        </ButtonsWrap>
      </Wrap>
      {rate && (
        <>
          <InfoWrap>
            <ShippingMode>
              <img src={rate?.shipping_type === "sea" ? ship : plane} alt="" />
            </ShippingMode>
            <FieldsWrap>
              <FieldOuter>
                <Label>{t("Dashboard/Route")}</Label>
                {/*<div style={{marginTop:"-5px"}}>*/}
                <RouteName>{rate?.origin.code}</RouteName>
                <RouteName>{rate?.destination.code}</RouteName>
                {/*</div>*/}
              </FieldOuter>
            </FieldsWrap>
            <FieldsWrap>
              <FieldOuter>
                <Label>{t("Quote bid screen/CARRIER")}</Label>
                <Controller
                  name="carrier"
                  control={control}
                  defaultValue={rate?.carrier.id}
                  as={<Content>{rate?.carrier.title}</Content>}
                />
              </FieldOuter>
              <FieldOuter>
                <Label>Sh{t("Quotes/SHIPPING MODE")}</Label>
                <Controller
                  name="shipping_mode"
                  control={control}
                  defaultValue={rate?.shipping_mode.id}
                  as={<Content>{rate?.shipping_mode.title}</Content>}
                />
              </FieldOuter>
            </FieldsWrap>
            <FieldsWrap>
              <FieldOuter>
                <Label>{t("Bookings/STATUS")}</Label>
                <Controller
                  name="carrier"
                  control={control}
                  defaultValue={rate?.is_active}
                  as={
                    <Content>{rate?.is_active ? t("Dashboard Menu/ACTIVE") : t("Dashboard Menu/INACTIVE")}</Content>
                  }
                />
              </FieldOuter>
              <FieldOuter>
                <Label>{t("Bookings/TRANSIT TIME")}</Label>
                <Controller
                  name="shipping_mode"
                  control={control}
                  defaultValue={rate?.transit_time}
                  as={<Content>{`${rate?.transit_time} ${t("Billing/days")}`}</Content>}
                />
              </FieldOuter>
            </FieldsWrap>
          </InfoWrap>
          {rate.rates?.length > 0 && (
            <ExistingRatesTable
              rate={rate}
              control={control}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
              getSurchargeForRate={getSurchargeForRate}
              setFormMode={setFormMode}
              getSurchargeForNewRate={getSurchargeForNewRate}
            />
          )}
          {existing_surcharge && (
            <SurchargesToRate existing_surcharge={existing_surcharge} />
          )}
        </>
      )}
    </RateContainer>
  );
};

export default Rate;
