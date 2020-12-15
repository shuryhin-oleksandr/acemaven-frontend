import React, {useEffect, useState} from "react";
//react hook form
import { Controller } from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//types
import {ContainerType, RateInfoType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {
  AdditionalSurchargeType,
  SurchargeInfoType
} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//BLL
import {addNewSurchargeForRate, editRates} from "../../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {
  getEditSuccess,
  getEmptyExistingSurcharge, getExistingSurcharge, getRateStartDate
} from "../../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import {rateActions} from "../../../../../../_BLL/reducers/surcharge&rates/rateReducer";
//COMPONENTS
import ExistingRatesTable from "./ExistingRatesTable";
import SurchargesToRate from "../../register_new_freight_rate/tables/SurchargesToRate";
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
  Label, PauseButton,
} from "./exact-rate-styles";
import { SaveButton } from "../../../surcharge/surcharges_page/surcharge/surcharge-style";
//icons
import pause from "../../../../../assets/icons/rates&services/pause.svg";
import play from "../../../../../assets/icons/rates&services/play_icon.svg";
import ship from "../../../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../../../assets/icons/rates&services/plane-surcharge.svg";
import NoSurchargeCard from "../../register_new_freight_rate/NoSurchargeCard";
import {RatesWrapper} from "../../register_new_freight_rate/RegisterNewFreightRateContainer";
import _ from "lodash";
import NoSurchargeForRatePopup
  from "../../../../../components/PopUps/no_surharge_for_rate_popup/NoSurchargeForRatePopup";
import ModalWindow from "../../../../../components/_commonComponents/ModalWindow/ModalWindow";
import RegisterSurchargePopUp from "../../../../../components/PopUps/RegisterSurchargePopUp/RegisterSurchargePopUp";


type PropsType = {
  is_active: boolean,
  rate: RateInfoType | null,
  id: number,
  handleSubmit: any,
  errors: any,
  setValue: any,
  control: any,
  getValues: any,
  activateRateHandler: (id: any, value: boolean) => void
  getSurchargeForRate: any
  getSurchargeForNewRate: any
  existing_surcharge: SurchargeInfoType | null,
  history: any,
  usage_fees: ContainerType[],
  charges:  AdditionalSurchargeType[]
}

const Rate:React.FC<PropsType> = ({ is_active, rate, handleSubmit, errors, setValue,
                                    control, getValues, activateRateHandler, getSurchargeForRate,
                                    existing_surcharge, history, getSurchargeForNewRate, usage_fees, charges
                                  }) => {
  const [formMode, setFormMode] = useState(false);
  const [noSurchargePopup, setNoSurchargePopup] = useState(false);
  //попап для нового сюрчарджа
  const [newSurchargePopUpVisible, setNewSurchargePopUpVisible] = useState(false);

  //data from store
  let edit_success = useSelector(getEditSuccess)
  const empty_surcharge = useSelector(getEmptyExistingSurcharge)
  const rate_start_date = useSelector(getRateStartDate)

  useEffect(() => {
    if(rate && rate.rates.length > 1) {
      rate.rates.map((r) => {
        setValue(`rates.${r.id}.from`, r.start_date)
        setValue(`rates.${r.id}.to`, r.expiration_date)
      })
    }
    else {
      rate && setValue(`rates.from`, rate.rates[0].start_date) && setValue(`rates.to`, rate.rates[0].expiration_date)
    }
  }, [rate, setValue])


  let rates_from_server = rate?.rates?.map(r => (
      {
        id: r.id,
        rate: r.rate,
        currency: r.currency.id,
        container_type: r.container_type ? r.container_type.id : null,
        date_updated: r.date_updated,
        updated_by: r.updated_by,
        from: r.start_date ? r.start_date : '',
        to: r.expiration_date ? r.expiration_date : ''
      }
  ))

const dispatch = useDispatch()
  const onSubmit = (values: any) => {

    let rates: any[] = [];

    values.rates && Object.keys(values.rates).forEach((key : any) => (values.rates[key] !== null && values.rates[key].from !== null
        && rates.push({id: Number(key), ...values.rates[key]})))
   /* console.log(rates)
    console.log('s', rates_from_server)*/
    let rates_to_submit = rates_from_server && _.differenceWith(rates, rates_from_server, _.isEqual)

    //check surcharges
    let ifNotAllContainersHaveSurcharges = rates.some(r => {
      const checkedRate = rate?.rates?.find(sr => sr.id === r.id);
      return (checkedRate?.surcharges.length === 0)
    })

   !ifNotAllContainersHaveSurcharges && rates_to_submit && rates_to_submit.length > 0 && dispatch(editRates(Number(rate?.id), rates_to_submit, history))
  }


  const createNewSurcharge = (data: any) => {
    dispatch(addNewSurchargeForRate(data))
  }

  useEffect(() => {
    if(edit_success) {
      setFormMode(false)
      dispatch(rateActions.setEditSuccess(''))
    }
  }, [edit_success, dispatch])


  useEffect(() => {
    if(empty_surcharge) {
      setNoSurchargePopup(true)
    }
  }, [empty_surcharge])

  return (
    <RateContainer onSubmit={handleSubmit(onSubmit)}>
      <ModalWindow isOpen={noSurchargePopup} >
        <NoSurchargeForRatePopup setNoSurchargePopup={setNoSurchargePopup}
                                 setNewSurchargePopUpVisible={setNewSurchargePopUpVisible}
        />
      </ModalWindow>
      <ModalWindow isOpen={newSurchargePopUpVisible} >
       <RegisterSurchargePopUp setIsOpen={setNewSurchargePopUpVisible}
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
        <RateTitle>Freight Rate</RateTitle>
        <ButtonsWrap>
          {formMode && <SaveButton type="submit">SAVE CHANGES</SaveButton>}
          <PauseButton type='button' onClick={() => activateRateHandler(rate?.id, !rate?.is_active)}>
            <PauseImg src={is_active ? pause : play} alt="" />
          </PauseButton>
        </ButtonsWrap>
      </Wrap>
      {rate && (
        <>
          <InfoWrap>
            <ShippingMode>
              <img
                src={rate?.shipping_type === "sea" ? ship : plane}
                alt=""
              />
            </ShippingMode>
            <FieldsWrap>
              <FieldOuter>
                <Label>Route</Label>
                <RouteName>{rate?.origin.code}</RouteName>
                <RouteName>{rate?.destination.code}</RouteName>
              </FieldOuter>
            </FieldsWrap>
            <FieldsWrap>
              <FieldOuter>
                <Label>Carrier</Label>
                <Controller
                  name="carrier"
                  control={control}
                  defaultValue={rate?.carrier.id}
                  as={<Content>{rate?.carrier.title}</Content>}
                />
              </FieldOuter>
              <FieldOuter>
                <Label>Shipping mode</Label>
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
                <Label>Status</Label>
                <Controller
                  name="carrier"
                  control={control}
                  defaultValue={rate?.is_active}
                  as={
                    <Content>{rate?.is_active ? "ACTIVE" : "INACTIVE"}</Content>
                  }
                />
              </FieldOuter>
              <FieldOuter>
                <Label>Transit time</Label>
                <Controller
                  name="shipping_mode"
                  control={control}
                  defaultValue={rate?.transit_time}
                  as={<Content>{`${rate?.transit_time} days`}</Content>}
                />
              </FieldOuter>
            </FieldsWrap>
          </InfoWrap>
          {rate.rates?.length > 0 && (
            <ExistingRatesTable rate={rate}
                                control={control}
                                setValue={setValue}
                                getValues={getValues}
                                errors={errors}
                                getSurchargeForRate={getSurchargeForRate}
                                setFormMode={setFormMode}
                                getSurchargeForNewRate={getSurchargeForNewRate}
            />
          )}
          {existing_surcharge && <SurchargesToRate existing_surcharge={existing_surcharge}/>}
          {/*{empty_surcharge === 'empty' && <NoSurchargeCard usageFees={[]}
                                                           shippingValue={rate.shipping_mode.id}
                                                           setNewSurchargePopUpVisible={setNewSurchargePopUpVisible}
          />
          }*/}
        </>
      )}
    </RateContainer>
  );
};

export default Rate
