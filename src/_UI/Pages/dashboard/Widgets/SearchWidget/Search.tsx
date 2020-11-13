import React, { useEffect, useState } from "react";
//react-router-dom
import { useHistory } from "react-router-dom";
//react-hook-form
import { Controller, useFieldArray, useForm } from "react-hook-form";
//moment
import moment from "moment";
//types
import {
  CurrentShippingType,
  ShippingTypesEnum,
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { ShippingModeEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { getShippingTypes } from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import { PortType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {
  CargoGroupType,
  SearchResultType,
} from "../../../../../_BLL/types/search/search_types";
import { PackagingType } from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
// BLL
import { useDispatch, useSelector } from "react-redux";
import { getShippingTypesSelector } from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import { getPorts } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {
  getDestinationPorts,
  getIsLocalPort,
  getOriginPorts,
} from "../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import { rateActions } from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";
import {
  getFrozenChoices,
  searchRatesOffersThunk,
} from "../../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import { postSearchQuoteThunk } from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import { getFrozenChoicesSelector } from "../../../../../_BLL/selectors/search/searchClientSelector";
import { searchActions } from "../../../../../_BLL/reducers/search_client/searchClientReducer";
import { bookingActions } from "../../../../../_BLL/reducers/bookingReducer";
//components
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import BaseButton from "../../../../components/base/BaseButton";
import BaseTooltip from "../../../../components/_commonComponents/baseTooltip/BaseTooltip";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import Dates from "../../Dates";
import FCLFieldArray from "./FCLFieldArray/FCLFieldArray";
import OtherModesFieldArray from "./Others_modes_fields_array/OtherModesFieldArray";
import NoSearchResultCard from "../../search/search_rate_card/no_search_card/NoSearchResultCard";
//styles
import {
  Container,
  Heading,
  RelativeWrapper,
  ButtonGroup,
  AddImg,
  ErrorMessage,
} from "./searchWidgett-styles";
import {
  Port,
  PortsList,
} from "../../../Services&Rates/surcharge/register_new_surcharge/form-styles";
import { CalculateButton } from "./Others_modes_fields_array/other-fields-array-styles";
//icons
import AddIcon from "../../../../assets/icons/widgets/add-icon.svg";
import { uniqWith, isEqual } from "lodash";

type PropsType = {
  right?: string;
  bottom?: string;
  setOpenCalcPopup: (value: boolean) => void;
  shippingValue: number;
  setShippingValue: (value: number) => void;
  mode: CurrentShippingType;
  setMode: (value: CurrentShippingType) => void;
  cargo_groups_list: CargoGroupType[] | null;
  packaging_types: PackagingType[] | null;
  disabled: any;
  search_result: SearchResultType[];
  search_success: boolean;
  setDuplicatedCargoError: (value: string) => void;
  duplicatedCargoError: string;
};

const Search: React.FC<PropsType> = ({
  bottom,
  right,
  setOpenCalcPopup,
  shippingValue,
  setShippingValue,
  mode,
  setMode,
  cargo_groups_list,
  packaging_types,
  disabled,
  search_success,
  search_result,
  duplicatedCargoError,
  setDuplicatedCargoError,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //delete cargo groups from cargo list after calculation
  const deleteCargoGroup = (id: number) => {
    dispatch(searchActions.deleteCargoGroup(id));
  };
  //set editable cargo group to state
  const setEditableCargoGroupToState = (id: number) => {
    dispatch(searchActions.setEditableCargoGroup(id));
  };
  //edit chosen one
  const editCargoGroup = (edit_data: CargoGroupType) => {
    dispatch(searchActions.editChosenCargoGroup(edit_data));
  };

  const [dates, setDates] = useState([]);
  useEffect(() => {
    dispatch(getShippingTypes(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFrozenChoices());
  }, [dispatch]);

  useEffect(() => {
    reset();
    dispatch(searchActions.clearCargoList([]));
    setDates([]);
  }, [mode]);

  const shippingTypes = useSelector(getShippingTypesSelector);
  const origin_ports = useSelector(getOriginPorts);
  const destination_ports = useSelector(getDestinationPorts);
  const frozen_choices = useSelector(getFrozenChoicesSelector);
  const origin_port_value = useSelector(getIsLocalPort);

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
      cargo_groups: [
        {
          container_type: "",
          volume: 0,
          frozen: "",
          dangerous: false,
        },
      ],
    },
  });

  const watchFields = watch(["shipping_mode", "origin", "destination"]);
  const watchResultArr = Object.values(watchFields).filter((val) => !!val);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cargo_groups",
  });
  const watchFieldArray = watch("cargo_groups");

  let onOriginChangeHandler = (value: any) => {
    // if (value.value.length >= 3) {
    dispatch(getPorts("", value.value, "origin", mode));
    // }
  };
  let onDestinationChangeHandler = (value: any) => {
    // if (value.value.length >= 3) {
    origin_port_value?.is_local
      ? dispatch(getPorts(false, value.value, "destination", mode))
      : dispatch(getPorts(true, value.value, "destination", mode));
    // }
  };

  let closePortsHandler = (port: PortType, field: string) => {
    dispatch(rateActions.setOriginPortValue(port));
    setValue(field, port.display_name);
    sessionStorage.setItem(`${field}_id`, JSON.stringify(port.id));
    dispatch(rateActions.setOriginPortsList([]));
    dispatch(rateActions.setDestinationPortsList([]));
  };

  let newSearch = () => {
    dispatch(searchActions.setSearchSuccess(false));
    dispatch(searchActions.clearCargoList([]));
    setShippingValue(0);
    reset();
    setDates([]);
  };

  const onSubmit = (values: any) => {
    let finalData;
    if (values.cargo_groups) {
      finalData = {
        shipping_mode: values.shipping_mode,
        date_from: moment(dates[0]).format("DD/MM/YYYY"),
        date_to: moment(dates[1]).format("DD/MM/YYYY"),
        destination: Number(sessionStorage.getItem("destination_id")),
        origin: Number(sessionStorage.getItem("origin_id")),
        cargo_groups: values.cargo_groups.map((c: any) =>
          c.frozen
            ? {
                container_type: c.container_type,
                frozen: c.frozen,
                volume: Number(c.volume),
              }
            : {
                container_type: c.container_type,
                dangerous: c.dangerous,
                volume: Number(c.volume),
              }
        ),
      };

      const arrWithoutValues = finalData.cargo_groups.map((c: any) => {
        const copyObj = { ...c };
        delete copyObj.volume;
        return copyObj;
      });

      const uniqCargoArr = uniqWith(arrWithoutValues, isEqual);

      if (uniqCargoArr.length === finalData.cargo_groups.length) {
        const arrWithDescription = finalData.cargo_groups.map(
          (c: any, index: number) => ({
            ...c,
            description: "",
            id: index + 1,
          })
        );
        dispatch(
          bookingActions.set_current_booking_cargo_groups(arrWithDescription)
        );
        setDuplicatedCargoError("");
        search_result.length == 0 && search_success
          ? dispatch(postSearchQuoteThunk(finalData, history))
          : dispatch(searchRatesOffersThunk(finalData));
      } else {
        setDuplicatedCargoError("You have duplicated cargo groups");
      }
    } else {
      finalData = {
        shipping_mode: values.shipping_mode,
        date_from: moment(dates[0]).format("DD/MM/YYYY"),
        date_to: moment(dates[1]).format("DD/MM/YYYY"),
        destination: Number(sessionStorage.getItem("destination_id")),
        origin: Number(sessionStorage.getItem("origin_id")),
        cargo_groups: cargo_groups_list?.map((c) =>
          c.package_type
            ? {
                packaging_type: c.package_type,
                dangerous: c.dangerous,
                volume: Number(c.volume),
                weight: Number(c.weight),
                length: Number(c.length),
                width: Number(c.width),
                height: Number(c.height),
                total_wm: c.total_wm,
                length_measurement: c.length_measurement,
                weight_measurement: c.weight_measurement,
              }
            : {
                container_type: c.container_type,
                dangerous: c.dangerous,
                volume: Number(c.volume),
                weight: Number(c.weight),
                length: Number(c.length),
                width: Number(c.width),
                height: Number(c.height),
                total_wm: c.total_wm,
                length_measurement: c.length_measurement,
                weight_measurement: c.weight_measurement,
              }
        ),
      };
    }

    dispatch(
      bookingActions.set_booking_dates({
        date_from: finalData.date_from,
        date_to: finalData.date_to,
      })
    );
  };

  const shippingValueReset = () => {
    setValue("cargo_groups", [
      {
        container_type: "",
        volume: 0,
        frozen: "",
        dangerous: false,
      },
    ]);
    // reset({
    //   shipping_mode: !!shippingValue ? shippingValue.toString() : "",
    //   origin: "",
    //   destination: "",
    //   cargo_groups: [
    //     {
    //       container_type: "",
    //       volume: 0,
    //       frozen: "",
    //       dangerous: false,
    //     },
    //   ],
    // });
    // setDates([]);
    dispatch(searchActions.setSearchSuccess(false));
    dispatch(searchActions.clearCargoList([]));
  };

  useEffect(() => {
    shippingValueReset();
  }, [shippingValue]);

  return (
    <RelativeWrapper>
      <Container scroll={watchFieldArray.length > 3}>
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
              disabled={disabled}
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
                  disabled={disabled}
                  placeholder="Shipping Mode"
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
                disabled={disabled}
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
                disabled={disabled}
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
              disabled={disabled}
            />
          </div>
          {!!duplicatedCargoError ? (
            <ErrorMessage>{duplicatedCargoError}</ErrorMessage>
          ) : null}
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
                disabled={disabled}
              />
            ) : (
              cargo_groups_list &&
              cargo_groups_list.length > 0 && (
                <OtherModesFieldArray
                  cargo_groups={cargo_groups_list}
                  packaging_types={packaging_types}
                  deleteCargoGroup={deleteCargoGroup}
                  setEditableCargoGroupToState={setEditableCargoGroupToState}
                  editCargoGroup={editCargoGroup}
                  setOpenCalcPopup={setOpenCalcPopup}
                  search_success={search_success}
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
            {!search_success &&
              dates.length > 0 &&
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
                !!watchFieldArray[0].volume &&
                !search_success &&
                shippingValue === ShippingModeEnum.FCL && (
                  <BaseTooltip
                    title={"Add more cargo groups by clicking on plus"}
                  >
                    <AddImg
                      onClick={() => append({ name: "cargo_groups" })}
                      src={AddIcon}
                      alt="add"
                    />
                  </BaseTooltip>
                )}

              {!search_success ? (
                <BaseButton type="submit">Search</BaseButton>
              ) : search_result.length !== 0 ? (
                <BaseButton type="button" onClick={newSearch}>
                  New Search
                </BaseButton>
              ) : null}
            </div>
          </ButtonGroup>
        </form>
      </Container>
      {search_result.length == 0 && search_success && (
        <NoSearchResultCard
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          newSearch={newSearch}
        />
      )}
    </RelativeWrapper>
  );
};

export default Search;
