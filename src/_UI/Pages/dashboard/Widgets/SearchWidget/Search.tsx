import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import {
  CurrentShippingType,
  ShippingTypesEnum,
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
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
import FCLFieldArray from "./FCLFieldArray/FCLFieldArray";
import { getFrozenChoices } from "../../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import { getFrozenChoicesSelector } from "../../../../../_BLL/selectors/search/searchClientSelector";
import OtherModesFieldArray from "./Others_modes_fields_array/OtherModesFieldArray";
import { CalculateButton } from "./Others_modes_fields_array/other-fields-array-styles";
import { CargoGroupType } from "../../../../../_BLL/types/search/search_types";
import { searchActions } from "../../../../../_BLL/reducers/search_client/searchClientReducer";
import { PackagingType } from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
  right?: string;
  bottom?: string;
  setOpenCalcPopup: (value: boolean) => void;
  shippingValue: number;
  setShippingValue: (value: number) => void;
  mode: CurrentShippingType;
  setMode: (value: CurrentShippingType) => void;
  cargo_groups: CargoGroupType[] | null;
  packaging_types: PackagingType[] | null;
};

const Search: React.FC<PropsType> = (
  {
    bottom,
    right,
    setOpenCalcPopup,
    shippingValue,
    setShippingValue,
    mode,
    setMode,
    cargo_groups,
    packaging_types,
  },
  newParam = ""
) => {
  const dispatch = useDispatch();

  const [dates, setDates] = useState([]);

  useEffect(() => {
    dispatch(getShippingTypes(""));
  }, []);

  useEffect(() => {
    dispatch(getFrozenChoices());
  }, []);

  useEffect(() => {
    reset();
    dispatch(searchActions.clearCargoList([]));
    setDates([]);
  }, [mode]);

  const shippingTypes = useSelector(getShippingTypesSelector);
  const origin_ports = useSelector(getOriginPorts);
  const destination_ports = useSelector(getDestinationPorts);
  const frozen_choices = useSelector(getFrozenChoicesSelector);

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
    reset,
    errors,
    getValues,
    setValue,
    watch,
  } = useForm({
    reValidateMode: "onBlur",
    defaultValues: {
      shipping_mode: "",
      origin: "",
      destination: "",
      search_test: [
        {
          container_type: "",
          volume: "",
          is_frozen: "",
          can_be_dangerous: false,
        },
      ],
    },
  });

  const watchFields = watch(["shipping_mode", "origin", "destination"]);
  const watchResultArr = Object.values(watchFields).filter((val) => !!val);
  console.log("watchResultArr", watchResultArr);

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
    debugger;
    const finalData = values;
    finalData.date_from = moment(dates[0]).format("DD/MM/YYYY");
    finalData.date_to = moment(dates[1]).format("DD/MM/YYYY");
    finalData.destination = Number(sessionStorage.getItem("destination_id"));
    finalData.origin = Number(sessionStorage.getItem("origin_id"));
    console.log("finalData", finalData);
  };

  return (
    <RelativeWrapper>
      <Container scroll={watchFieldArray.length > 3 ? true : false}>
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
                  error={errors?.shipping_mode?.message}
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
                error={errors?.origin}
                getValues={getValues}
                onChange={onOriginChangeHandler}
                background="#ECECEC"
                marginBottom="0"
                messagePaddingTop="4px"
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
                error={errors?.destination}
                getValues={getValues}
                onChange={onDestinationChangeHandler}
                background="#ECECEC"
                marginBottom="0"
                messagePaddingTop="4px"
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
              dates={dates}
            />
          </div>

          {watchResultArr.length === 3 && dates.length > 0 ? (
            shippingValue === 3 ? (
              <FCLFieldArray
                fields={fields}
                control={control}
                register={register}
                container_types={container_types}
                remove={remove}
                frozen_choices={frozen_choices}
                errors={errors}
              />
            ) : (
              cargo_groups &&
              cargo_groups.length > 0 && (
                <OtherModesFieldArray
                  cargo_groups={cargo_groups}
                  packaging_types={packaging_types}
                />
              )
            )
          ) : null}
          <ButtonGroup
            bottom={bottom}
            right={right}
            justify_content={
              dates.length > 0 &&
              watchResultArr.length === 3 &&
              shippingValue !== 3
                ? "space-between"
                : "flex-end"
            }
          >
            {dates.length > 0 &&
              watchResultArr.length === 3 &&
              shippingValue !== 3 && (
                <CalculateButton
                  type="button"
                  onClick={() => setOpenCalcPopup(true)}
                >
                  Calculate w/m
                </CalculateButton>
              )}
            <div style={{ display: "flex" }}>
              {watchFieldArray.length > 0 &&
                !!watchFieldArray[0].container_type &&
                !!watchFieldArray[0].volume && (
                  <BaseTooltip
                    title={"Add more cargo groups by clicking on plus"}
                  >
                    <AddImg
                      onClick={() => append({ name: "search_test" })}
                      src={AddIcon}
                      alt="add"
                    />
                  </BaseTooltip>
                )}

              <BaseButton type="submit">Search</BaseButton>
            </div>
          </ButtonGroup>
        </form>
      </Container>
    </RelativeWrapper>
  );
};

export default Search;
