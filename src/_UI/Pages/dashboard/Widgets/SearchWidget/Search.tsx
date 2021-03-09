import React, { useEffect } from "react";
//react-router-dom
import { useHistory } from "react-router-dom";
//react-hook-form
import { Controller, useFieldArray } from "react-hook-form";
//moment
import moment from "moment";
//Lodash
import { uniqWith, isEqual } from "lodash";
//react-custom-scrollbars
import { Scrollbars } from "react-custom-scrollbars";
//types
import {
  CurrentShippingType,
  ShippingTypesEnum,
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { ShippingModeEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { getShippingTypes } from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {
  ContainerType,
  PortType,
  ShippingTypeType,
} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {
  CargoGroupType,
  ChoiceType,
  SearchResultType,
} from "../../../../../_BLL/types/search/search_types";
import { PackagingType } from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
// BLL
import { useDispatch } from "react-redux";
import { getPorts } from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { rateActions } from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";
import {
  getFrozenChoices,
  searchRatesOffersThunk,
} from "../../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import { postSearchQuoteThunk } from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import { searchActions } from "../../../../../_BLL/reducers/search_client/searchClientReducer";
import { bookingActions } from "../../../../../_BLL/reducers/booking/bookingReducer";
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


type PropsType = {
  right?: string;
  bottom?: string;
  shippingTypes: ShippingTypeType[];
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
  origin_ports: PortType[];
  destination_ports: PortType[];
  frozen_choices: ChoiceType[];
  origin_port_value: PortType | null;
  container_types: ContainerType[];
  handleSubmit: any;
  register: any;
  control: any;
  reset: any;
  errors: any;
  getValues: any;
  setValue: any;
  watch: any;
  dates: any;
  setDates: any;
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
  shippingTypes,
  handleSubmit,
  register,
  control,
  reset,
  errors,
  getValues,
  setValue,
  watch,
  dates,
  setDates,
  ...props
}) => {

  //REACT HOOK FORM
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cargo_groups",
  });
  // const watchFields = watch(["shipping_mode", "origin", "destination"]);
  // const watchResultArr = Object.values(watchFields).filter((val) => !!val);
  const watchFieldArray = watch("cargo_groups");

  const onSubmit = (values: any) => {
    let finalData;
    if (dates.length > 0) {
      setDuplicatedCargoError("");
      //FCL
      if (values.shipping_mode === ShippingModeEnum.FCL) {
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

        // checking if there are duplicated cargo groups
        const arrWithoutValues = finalData.cargo_groups.map((c: any) => {
          const copyObj = { ...c };
          delete copyObj.volume;
          return copyObj;
        });
        const uniqCargoArr = uniqWith(arrWithoutValues, isEqual);
        //if there are no duplicates
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
          search_result.length === 0 && search_success
              ? dispatch(postSearchQuoteThunk(finalData, history))
              : // @ts-ignore
              dispatch(searchRatesOffersThunk(finalData));
        } else {
          //if there are duplicates
          setDuplicatedCargoError("You have duplicated cargo groups");
        }
      } else {
        //chargeable weight shipping modes
        finalData = {
          shipping_mode: values.shipping_mode,
          date_from: moment(dates[0]).format("DD/MM/YYYY"),
          date_to: moment(dates[1]).format("DD/MM/YYYY"),
          destination: Number(sessionStorage.getItem("destination_id")),
          origin: Number(sessionStorage.getItem("origin_id")),
          cargo_groups: cargo_groups_list?.map((c) =>
              c.packaging_type
                  ? {
                    packaging_type: c.packaging_type,
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

        //check if we have duplicates cargo groups
        const arrWithoutValues = finalData.cargo_groups?.map((c: any) => {
          const copyObj = { ...c };
          delete copyObj.volume;
          return copyObj;
        });
        const uniqCargoArr = uniqWith(arrWithoutValues, isEqual);
        //!!checking if cargo groups that are non containerized are not empty
        if(finalData.cargo_groups && finalData.cargo_groups.length > 0) {
          //if there are no duplicates --> submit
          if (uniqCargoArr.length === finalData.cargo_groups?.length) {
            //dispatch(searchActions.setDuplicatedError(""));
            search_result.length === 0 && search_success
                ? dispatch(postSearchQuoteThunk(finalData, history))
                : // @ts-ignore
                dispatch(searchRatesOffersThunk(finalData));
          } else {
            dispatch(
                searchActions.setDuplicatedError("You have duplicated cargo groups")
            );
          }
        } else {
          //if cargos are empty --> set error
          dispatch(searchActions.setDuplicatedError("One cargo group at least is required"));
          console.log('error')
        }


      }

      dispatch(
          bookingActions.set_booking_dates({
            date_from: finalData.date_from,
            date_to: finalData.date_to,
          })
      );
    } else {
      setDuplicatedCargoError("Please, enter dates");
    }
  };

  //HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

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

  // useEffect(() => {
  //   if (watchResultArr.length === 3 && dates.length > 0 ) {
  //     setDuplicatedCargoError("");
  //   }
  // }, [watchResultArr, dates]);

  useEffect(() => {
    shippingValueReset();
  }, [shippingValue]);


  //LOCAL STATE
  const shippingModeOptions =
      mode === ShippingTypesEnum.AIR
          ? shippingTypes[0]?.shipping_modes
          : shippingTypes[1]?.shipping_modes;

  let container_types = shippingModeOptions?.find((s) => s.id === shippingValue)
      ?.container_types;


  //HANDLERS
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
  //origin & destination change handlers
  let onOriginChangeHandler = (value: any) => {
   if (value.value.length >= 3) {
    dispatch(getPorts("", value.value, "origin", mode));
     }
  };
  let onDestinationChangeHandler = (value: any) => {
    if (value.value.length >= 3) {
    props.origin_port_value?.is_local
        ? dispatch(getPorts(false, value.value, "destination", mode))
        : dispatch(getPorts(true, value.value, "destination", mode));
    }
  };
//handler for close origin & destination ports list
  let closePortsHandler = (port: PortType, field: string) => {
    dispatch(rateActions.setOriginPortValue(port));
    setValue(field, port.display_name);
    sessionStorage.setItem(`${field}_id`, JSON.stringify(port.id));
    dispatch(rateActions.setOriginPortsList([]));
    dispatch(rateActions.setDestinationPortsList([]));
  };

  //new search - clear handler
  let newSearch = () => {
    reset();
    dispatch(searchActions.setSearchSuccess(false));
    dispatch(searchActions.clearCargoList([]));
    dispatch(searchActions.setSearchResult([]))
    setShippingValue(0);
    setDates([]);
  };

  //reset form handler ( for shipping mode field)
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

  let openCalcPopupAnaClearDuplicationError = () => {
    setOpenCalcPopup(true)
    setDuplicatedCargoError("");
  }


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
              thunkName="search_widget"
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
                  max_width={"18%"}
                  label={"Shipping mode"}
                  hideLabel={true}
                  margin_bottom={"0px"}
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
                  //validate: () => sessionStorage.getItem("origin_id") ? true : "Choose from the list"
                })}
                name="origin"
                placeholder="Origin"
                error={errors?.origin}
                onChange={onOriginChangeHandler}
                /*onBlur={() => {
                  setTimeout(() => {
                    if (!!sessionStorage.getItem("origin_id")) {
                      // @ts-ignore
                      setValue("origin", JSON.parse(sessionStorage.getItem("origin_id")).display_name);
                      dispatch(rateActions.setOriginPortsList([]));
                    }
                  }, 200)
                }}*/
                // background="#ECECEC"
                marginBottom="0"
                messagePaddingTop="4px"
                // onBlur={blurHandler}
                disabled={disabled}
              />
              {props.origin_ports && props.origin_ports?.length > 0 && (
                <Scrollbars
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    borderRadius: 5,
                    border: "1px solid rgba(0,0,0,0.5)",
                    top: 45
                  }}
                  autoHeight={true}
                  autoHeightMax={110}
                >
                  <PortsList>
                    {props.origin_ports?.map((p: PortType) => (
                      <Port
                        onClick={() => closePortsHandler(p, "origin")}
                        key={p?.id}
                      >
                        {p?.display_name}
                      </Port>
                    ))}
                  </PortsList>
                </Scrollbars>
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
                  //validate: () => sessionStorage.getItem("destination_id") ? true : "Choose from the list"
                })}
                name="destination"
                placeholder="Destination"
                error={errors?.destination}
                onChange={onDestinationChangeHandler}
                /*onBlur={() => {
                  setTimeout(() => {
                    if (sessionStorage.getItem("destination_id"))
                      { // @ts-ignore
                        setValue("destination", JSON.parse(sessionStorage.getItem("destination_id")).display_name);
                        dispatch(rateActions.setDestinationPortsList([]));
                      }
                  }, 200)
                }}*/
                // background="#ECECEC"
                marginBottom="0"
                messagePaddingTop="4px"
                disabled={disabled}
                //onBlur={blurHandler}
              />
              {props.destination_ports && props.destination_ports?.length > 0 && (
                <Scrollbars
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    borderRadius: 5,
                    border: "1px solid rgba(0,0,0,0.5)",
                    top: 45
                  }}
                  autoHeight={true}
                  autoHeightMax={110}
                >
                  <PortsList>
                    {props.destination_ports?.map((p: PortType) => (
                      <Port
                        onClick={() => closePortsHandler(p, "destination")}
                        key={p?.id}
                      >
                        {p?.display_name}
                      </Port>
                    ))}
                  </PortsList>
                </Scrollbars>
              )}
            </div>
            <Dates
              setDates={setDates}
              extraDateNumber={mode === "sea" ? 9 : 2}
              dates={dates}
              disabled={disabled}
              shippingValueReset={shippingValueReset}
              placeholder={"Shipment Dates"}
            />
          </div>
          {!!duplicatedCargoError ? (
            <ErrorMessage>{duplicatedCargoError}</ErrorMessage>
          ) : null}
          {shippingValue === 3 ? (
              <FCLFieldArray
                fields={fields}
                control={control}
                register={register}
                container_types={container_types}
                remove={remove}
                frozen_choices={props.frozen_choices}
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
                  container_types={props.container_types}
                />
              )
            )
          }
          <ButtonGroup
            bottom={bottom}
            right={right}
            justify_content={
              ![1,2,4,5].find(i=>i===shippingValue) ?
                  "flex-end"
                  :
                  search_success ?
                      "flex-end"
                      :
                      "space-between"
            }
          >
            {!search_success &&
              [1,2,4,5].find(i=>i===shippingValue) && (
                <CalculateButton
                  type="button"
                  onClick={openCalcPopupAnaClearDuplicationError}
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
                <BaseButton onClick={(e) => {
                  e.preventDefault();
                  newSearch();
                }}>
                  New Search
                </BaseButton>
              ) : null}
            </div>
          </ButtonGroup>
        </form>
      </Container>
      {search_result.length === 0 && search_success && (
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
