import React, { useEffect, useState } from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {
  Container,
  Heading,
  RelativeWrapper,
  ButtonGroup,
  AddImg,
} from "./searchWidgett-styles";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import BaseButton from "../../../../components/base/BaseButton";
import AddIcon from "../../../../assets/icons/widgets/add-icon.svg";
import BaseTooltip from "../../../../components/_commonComponents/baseTooltip/BaseTooltip";
import {
  Port,
  PortsList,
} from "../../../Services&Rates/surcharge/register_new_surcharge/form-styles";
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { useDispatch, useSelector } from "react-redux";
import { getShippingTypesSelector } from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import { getShippingTypes } from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import { PortType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import { getPorts } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {
  getDestinationPorts,
  getOriginPorts,
} from "../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import { rateActions } from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";

type PropsType = {
  right?: string;
  bottom?: string;
};

const Search: React.FC<PropsType> = ({ bottom, right }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("sea");
  const [shippingValue, setShippingValue] = useState(0);
  useEffect(() => {
    dispatch(getShippingTypes(""));
  }, []);
  const shippingTypes = useSelector(getShippingTypesSelector);
  const origin_ports = useSelector(getOriginPorts);
  const destination_ports = useSelector(getDestinationPorts);

  const shippingModeOptions =
      mode === ShippingTypesEnum.AIR
          ? shippingTypes[0]?.shipping_modes
          : shippingTypes[1]?.shipping_modes;

  let container_types = shippingModeOptions?.find(s => s.id === shippingValue)?.container_types


  const {
    handleSubmit,
    register,
    control,
    errors,
    getValues,
    setValue,
  } = useForm({
    reValidateMode: 'onBlur',
    /*defaultValues: {
      search_test: [{
        container_type: null,
        volume: 0,
        is_frozen: 'frozen',
      }]
    }*/
  });

  const {fields, append} = useFieldArray(
      {
        control,
        name: "search_test"
      }
  );

  let onOriginChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "origin", mode));
  };
  let onDestinationChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "destination", mode));
  };

  let closePortsHandler = (port: PortType, field: string) => {
    dispatch(rateActions.setOriginPortValue(port))
    setValue(field, port.display_name);
    dispatch(rateActions.setOriginPortsList([]));
    dispatch(rateActions.setDestinationPortsList([]));
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <RelativeWrapper>
      <Container>
        <Heading>Search Rates</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <OptionsDeliveryButtons
              mode={mode}
              setMode={setMode}
              directory=""
              searchColumn=""
              searchValue=""
            />
            <Controller
              name="shipping_mode"
              control={control}
              defaultValue=""
              rules={{
                required: "Field is required",
              }}
              as={
                <SurchargeRateSelect
                  options={shippingModeOptions}
                  callback={setShippingValue}
                  // error={errors?.shipping_mode?.message}
                  maxW={"19%"}
                  label={"Shipping mode"}
                  hideLabel={true}
                  background={"#ECECEC"}
                  marginBot={"0px"}
                />
              }
            />
            <div
              style={{
                width: "19%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <FormField
                inputRef={register({
                  required: "Field is required",
                })}
                name="origin"
                placeholder="Origin"
                // label="Origin"
                // error={errors?.origin}
                getValues={getValues}
                onChange={onOriginChangeHandler}
                background="#ECECEC"
                marginBottom="0"
                // onBlur={blurHandler}
              />
              {origin_ports && origin_ports?.length > 0 && (
                <PortsList>
                  {origin_ports?.map((p: PortType) => (
                    <Port
                      onClick={() => closePortsHandler(p, "origin")}
                      key={p?.id}
                    >
                      {p?.display_name}
                    </Port>
                  ))}
                </PortsList>
              )}
            </div>
            <div
              style={{
                width: "19%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <FormField
                inputRef={register({
                  required: "Field is required",
                })}
                name="destination"
                placeholder="Destination"
                // label="Destination"
                // error={errors?.destination}
                getValues={getValues}
                onChange={onDestinationChangeHandler}
                background="#ECECEC"
                marginBottom="0"
                //onBlur={blurHandler}
              />
              {destination_ports && destination_ports?.length > 0 && (
                <PortsList>
                  {destination_ports?.map((p: PortType) => (
                    <Port
                      onClick={() => closePortsHandler(p, "destination")}
                      key={p?.id}
                    >
                      {p?.display_name}
                    </Port>
                  ))}
                </PortsList>
              )}
            </div>
          </div>
          {fields.map((item, index) => {
            return (
                <div style={{width: '100%', display: 'flex'}}>
                  <Controller control={control}
                              name={`search_test[${index}].container_type`}
                              defaultValue={item.container_type}
                              as={
                                  <SurchargeRateSelect options={container_types}
                                                       maxW='140px'
                                                       marginRight= '16px'
                                  />
                              }
                  />
                  <Controller control={control}
                              name={`search_test[${index}].volume`}
                              as={
                                <div style={{marginRight: '10px', width: '130px', display: 'flex'}}>
                                  <FormField marginBottom='5px'
                                  />
                                </div>

                              }
                  />
                  <Controller control={control}
                              name={`search_test[${index}].is_frozen`}
                              defaultValue='frozen'
                              as={
                                <SurchargeRateSelect maxW='115px'
                                />
                              }
                  />
                </div>
                )
          })}
          <ButtonGroup bottom={bottom} right={right}>
            <BaseTooltip title={"Add more cargo groups by clicking on plus"}>
              <AddImg onClick={() => append({name: 'search_test'})} src={AddIcon} alt="add" />
            </BaseTooltip>
            <BaseButton type="submit">Search</BaseButton>
          </ButtonGroup>
        </form>
      </Container>
    </RelativeWrapper>
  );
};

export default Search;
