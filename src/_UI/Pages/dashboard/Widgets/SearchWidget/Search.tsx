import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Container,
  Heading,
  RelativeWrapper,
  ButtonGroup,
  AddImg,
  RemoveImg,
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
import Dates from "../../Dates";
import moment from "moment";
import RemoveIcon from "../../../../assets/icons/widgets/remove-icon.svg";

type PropsType = {
  right?: string;
  bottom?: string;
};

const Search: React.FC<PropsType> = ({ bottom, right }, newParam = "") => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("sea");
  const [shippingValue, setShippingValue] = useState(0);
  console.log("shippingValue", shippingValue);
  const [dates, setDates] = useState([]);
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

  let container_types = shippingModeOptions?.find((s) => s.id === shippingValue)
    ?.container_types;

  const {
    handleSubmit,
    register,
    control,
    errors,
    getValues,
    setValue,
    watch,
  } = useForm({
    reValidateMode: "onBlur",
    defaultValues: {
      search_test: [
        {
          container_type: "",
          volume: "",
          is_frozen: "",
        },
      ],
    },
  });

  const watchFields = watch(["shipping_mode", "origin", "destination"]);
  const watchResultArr = Object.values(watchFields).filter((val) => !!val);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "search_test",
  });
  const watchFieldArray = watch("search_test");
  console.log("watchFieldArray", watchFieldArray);

  let onOriginChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "origin", mode));
  };
  let onDestinationChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "destination", mode));
  };

  let closePortsHandler = (port: PortType, field: string) => {
    dispatch(rateActions.setOriginPortValue(port));
    setValue(field, port.display_name);
    sessionStorage.setItem(`${field}_id`, JSON.stringify(port.id));
    dispatch(rateActions.setOriginPortsList([]));
    dispatch(rateActions.setDestinationPortsList([]));
  };

  const onSubmit = (values: any) => {
    const finalData = values;
    finalData.from = moment(dates[0]).format("DD/MM/YYYY");
    finalData.to = moment(dates[1]).format("DD/MM/YYYY");
    finalData.destination = Number(sessionStorage.getItem("destination_id"));
    finalData.origin = Number(sessionStorage.getItem("origin_id"));
    console.log("finalData", finalData);
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
              marginBottom: "10px",
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
                  maxW={"18%"}
                  label={"Shipping mode"}
                  hideLabel={true}
                  background={"#ECECEC"}
                  marginBot={"0px"}
                />
              }
            />
            <div
              style={{
                width: "18%",
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
                <PortsList top="45px">
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
                width: "18%",
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
                <PortsList top="45px">
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
            <Dates
              setDates={setDates}
              extraDateNumber={mode === "sea" ? 9 : 2}
            />
          </div>

          {watchResultArr.length === 3 &&
            dates.length > 0 &&
            (shippingValue === 3 || shippingValue === 2) &&
            fields.map((item, index) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                  key={item.id}
                >
                  <Controller
                    control={control}
                    name={`search_test[${index}].container_type`}
                    defaultValue={item.container_type}
                    as={
                      <SurchargeRateSelect
                        options={container_types}
                        maxW="140px"
                        marginRight="16px"
                        background="#ECECEC"
                      />
                    }
                  />
                  <Controller
                    control={control}
                    name={`search_test[${index}].volume`}
                    as={
                      <div
                        style={{
                          marginRight: "10px",
                          width: "130px",
                          display: "flex",
                        }}
                      >
                        <FormField background="#ECECEC" marginBottom="5px" />
                      </div>
                    }
                  />
                  <Controller
                    control={control}
                    name={`search_test[${index}].is_frozen`}
                    defaultValue="frozen"
                    as={
                      <SurchargeRateSelect background="#ECECEC" maxW="115px" />
                    }
                  />
                  {fields.length > 1 && (
                    <RemoveImg
                      src={RemoveIcon}
                      alt="remove"
                      onClick={() => remove(index)}
                    />
                  )}
                </div>
              );
            })}
          <ButtonGroup bottom={bottom} right={right}>
            {watchFieldArray.length > 0 && !!watchFieldArray[0].container_type && (
              <BaseTooltip title={"Add more cargo groups by clicking on plus"}>
                <AddImg
                  onClick={() => append({ name: "search_test" })}
                  src={AddIcon}
                  alt="add"
                />
              </BaseTooltip>
            )}

            <BaseButton type="submit">Search</BaseButton>
          </ButtonGroup>
        </form>
      </Container>
    </RelativeWrapper>
  );
};

export default Search;
