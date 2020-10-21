import React, {useEffect} from "react";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";
import {
  CloseButton,
  PopupContent,
  PopupOuter,
  ActionsWrapper,
  FormTitle,
  HeaderWrapper,
  RegisterButton,
  InfoWrap,
  ShippingMode,
  Content,
  FieldOuter,
  FieldsWrap,
  Label,
} from "./register-surcharge-styles";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import closeIcon from "../../../../_UI/assets/icons/close-icon.svg";
import ship from "../../../assets/icons/rates&services/ship-surcharge.svg";
import plane from "../../../assets/icons/rates&services/plane-surcharge.svg";
import { Controller, useForm } from "react-hook-form";
import {CarrierType, PortType } from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import { ShippingModeType } from "../../../../_BLL/types/rates&surcharges/ratesTypes";
import UsageFees from "../../../Pages/Services&Rates/surcharge/register_new_surcharge/tables/UsageFees";
import Additional from "../../../Pages/Services&Rates/surcharge/register_new_surcharge/tables/Additional";
import {
  AdditionalSurchargeType,
  ContainerType,
  SurchargeInfoType
} from "../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargesDates from "../../../Pages/Services&Rates/surcharge/register_new_surcharge/SurchargeDates";
import moment from "moment";
import {surchargeActions} from "../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {useDispatch} from "react-redux";
import {rateActions} from "../../../../_BLL/reducers/surcharge&rates/rateReducer";


type PropsType = {
  setIsOpen: VoidFunctionType;
  getValues?: any;
  popUpCarrier?: CarrierType;
  popUpShippingMode?: ShippingModeType | null;
  mode: string;
  usageFees: ContainerType[];
  additional: AdditionalSurchargeType[]
  shippingValue: number
  is_local_port: PortType | null
  destination_port_value: PortType | null
  rate_start_date: string
  createNewSurcharge: (surcharge_data: any) => void
  existing_surcharge: SurchargeInfoType | null
  setValue: any
};

const RegisterSurchargePopUp: React.FC<PropsType> = ({
  setIsOpen,
  popUpCarrier,
  popUpShippingMode, rate_start_date, createNewSurcharge, existing_surcharge,
  mode, usageFees, additional, shippingValue, is_local_port, destination_port_value
}) => {
  const { handleSubmit, errors, setValue, control } = useForm<any>({
    reValidateMode: "onBlur",
  });

  const dispatch = useDispatch()

  const onSubmit = (values: any) => {
    let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))
    let fees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null

    let usageFees_array = fees_array?.map(f => f.charge && {container_type: f.container_type,currency: f.currency, charge: f.charge}
        || !f.charge && {container_type: f.container_type, currency: f.currency}
    )

    let data = {
      carrier: values.carrier,
      direction: is_local_port?.is_local === true ? 'export' : 'import',
      shipping_mode: values.shipping_mode,
      start_date: values.from,
      expiration_date: moment(values.to).format('DD/MM/YYYY'),
      charges: charges_array, usage_fees: usageFees_array,
      location: is_local_port?.is_local === true ? is_local_port?.id : destination_port_value?.id
    }

    let data_without_fees = {
      start_date:values.from,
      expiration_date: moment(values.to).format('DD/MM/YYYY'),
      carrier: values.carrier,
      direction: is_local_port?.is_local === true ? 'export' : 'import',
      shipping_mode: values.shipping_mode,
      charges: charges_array,
      location: is_local_port?.is_local === true ? is_local_port?.id : destination_port_value?.id
    }
    usageFees_array !== null ? createNewSurcharge(data) : createNewSurcharge(data_without_fees)
  };

  useEffect(() => {
    if(existing_surcharge) {
      setIsOpen(false)
      dispatch(rateActions.setEmptyExistingSurcharge(''))
      dispatch(surchargeActions.setSurchargeInfo(null))
    }
  }, [existing_surcharge, dispatch])

  return (
    <PopupOuter>
      <PopupContent onSubmit={handleSubmit(onSubmit)}>
        <CloseButton onClick={() => setIsOpen && setIsOpen(false)}>
          <img src={closeIcon} alt="" />
        </CloseButton>
        <HeaderWrapper>
          <FormTitle>Register Surcharge</FormTitle>
          <ActionsWrapper>
            <RegisterButton type="submit">SAVE</RegisterButton>
            <CancelButton text="CANCEL" setIsOpen={setIsOpen} />
          </ActionsWrapper>
        </HeaderWrapper>
        <InfoWrap>
          <ShippingMode>
            <img src={mode === "sea" ? ship : plane} alt="" />
          </ShippingMode>
          <FieldsWrap>
            <FieldOuter>
              <Label>Carrier</Label>
              <Controller
                name='carrier'
                control={control}
                defaultValue={popUpCarrier?.id}
                as={<Content>{popUpCarrier?.title}</Content>}
              />
            </FieldOuter>
            <FieldOuter>
              <Label>Shipping mode</Label>
              <Controller
                name='shipping_mode'
                control={control}
                defaultValue={popUpShippingMode?.id}
                as={<Content>{popUpShippingMode?.title}</Content>}
              />
            </FieldOuter>
          </FieldsWrap>
          <FieldsWrap>
            <FieldOuter>
              <Label>Direction</Label>
              <Content c="#115B86">{is_local_port?.is_local === true ? 'Export' : 'Import'}</Content>
            </FieldOuter>
            <FieldOuter>
              <Label>Location</Label>
              <Content c="#115B86">{is_local_port?.is_local === true ? is_local_port.name : destination_port_value?.name}</Content>
            </FieldOuter>
          </FieldsWrap>
          <FieldsWrap>
            <SurchargesDates control={control}
                             setValue={setValue}
                             errors={{ from: errors.from, to: errors.to }}
                             textTransform='uppercase'
                             textColor='#115B86'
                             textFont='Helvetica Bold'
                             max_width='110px'
                             margin_bottom='0'
                             input_height='33px'
                             rate_start_date={rate_start_date}
            />
          </FieldsWrap>
        </InfoWrap>
        {usageFees.length > 0 && <UsageFees control={control} setValue={setValue}
                   tableName={mode === 'sea' ? 'HANDLING' : 'USAGE FEE'}
                   type={mode === 'sea' ? 'CONTAINER TYPE' : 'ULD TYPES'}
                   usageFees={usageFees}
        />}
        <Additional control={control}
                    charges={additional}
                    shippingMode={shippingValue}
                    setValue={setValue}
        />
      </PopupContent>
    </PopupOuter>
  );
};

export default RegisterSurchargePopUp;
