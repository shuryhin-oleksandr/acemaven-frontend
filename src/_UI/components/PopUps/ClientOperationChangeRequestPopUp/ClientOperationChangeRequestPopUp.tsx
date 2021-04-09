import React, { useEffect, useState } from "react";
import {
  CloseBtn,
  PopupContainer,
  PopupContent,
  Heading,
  HeadingText,
  HeadingWrap,
  ShippingModeText,
  ButtonsWrap,
  ConfirmButton,
  CancelButton,
  DatesError,
} from "./change-request-styles";
import close from "../../../../_UI/assets/icons/close-icon.svg";
import {
  SectionTitle,
  SectionWrapper,
} from "../../../Pages/operations/agent/ExactOperationContainer/OperationCard/operation-card-style";
import {
  CalendarIcon,
  GeneralBookingContent,
  InfoRow,
  InfoRowLabel,
  InfoRowValue,
} from "../../../Pages/Requests/Booking_agent/booking_card/booking-card-style";
import SurchargeRateSelect from "../../_commonComponents/select/SurchargeRateSelect";
import FormField from "../../_commonComponents/Input/FormField";
import calendar_icon from "../../../assets/icons/date_1.svg";
import Dates from "../../../Pages/dashboard/Dates";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import { OperationType } from "../../../../_BLL/types/operations/operationsTypes";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";
import { getReleaseTypeChoices } from "../../../../_BLL/thunks/booking_client_thunk/bookingClientThunk";
import {
  editOperationByClientThunk,
  getPackageTypesChoices,
  recalculateCharges,
} from "../../../../_BLL/thunks/operations/client/OperationsClientThunk";
import { AddImg } from "../../../Pages/dashboard/Widgets/SearchWidget/searchWidgett-styles";
import AddIcon from "../../../assets/icons/widgets/add-icon.svg";
import { clientOperationsActions } from "../../../../_BLL/reducers/operations/client/clientOperationsReducer";
import { getShippingTypes } from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import AddingGroupsForm from "./AddingGroupsForm/AddingGroupsForm";
import { changeBooking } from "../../../../_BLL/thunks/booking_client_thunk/bookingClientThunk";
import _ from "lodash";
import { bookingActions } from "../../../../_BLL/reducers/booking/bookingReducer";
import { ShippingModeEnum } from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import ModalWindow from "../../_commonComponents/ModalWindow/ModalWindow";
import AcceptPopup from "../accept_booking_popup/AcceptPopup";
import Layout from "../../BaseLayout/Layout";
import ClientChangeRequestPopUpForm from "../ClientChangeRequestPopUpForm/ClientChangeRequestPopUpForm";
import { EditTwoTone } from "@material-ui/icons";
import BaseTooltip from "../../_commonComponents/baseTooltip/BaseTooltip";
import ChargesChangeTable from "./ChargesChangeTable/ChargesChangeTable";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  row: {
    "&:hover": {
      // cursor: "pointer",
      backgroundColor: "#e9e9ec",
    },
  },
  shipping_cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
    padding: "0",
    paddingBottom: "15px",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "none",
    padding: "0",
    paddingTop: "15px",
    paddingRight: "30px",
    paddingLeft: "5px",
  },
  innerMainCell: {
    borderBottom: "1px solid #ECECEC",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    position: "relative",
    paddingRight: "40px",
    height: "72px",
    width: "50px",
  },
  innerCell: {
    borderBottom: "none",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "0",
    paddingBottom: "7px",
    paddingTop: "7px",
    paddingRight: "30px",
    paddingLeft: "5px",
  },

  customTooltip: {
    maxWidth: 330,
    height: 60,
    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
  },
});

type PropsTypes = {
  setIsOpen: (value: boolean) => void;
  operation_info: OperationType;
};

const ClientOperationChangeRequestPopUp: React.FC<PropsTypes> = ({
  setIsOpen,
  operation_info,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const [addGroupMode, setAddGroupMode] = useState(false);
  const [editableGroupIndex, setEditableGroupIndex] = useState(-1);

  useEffect(() => {
    dispatch(getReleaseTypeChoices());
    dispatch(getPackageTypesChoices());
  }, []);

  useEffect(() => {
    dispatch(
      clientOperationsActions.setOperationCargoGroups(
        operation_info.cargo_groups
      )
    );

    return () => {
      clearRecalculatedCharges();
      clearOperationCargoGroups();
      reset();
    };
  }, []);

  const clearRecalculatedCharges = () => {
    dispatch(clientOperationsActions.setRecalculatedCharges(null));
  };

  const clearOperationCargoGroups = () => {
    dispatch(clientOperationsActions.setOperationCargoGroups([]));
  };

  useEffect(() => {
    dispatch(getShippingTypes(""));
  }, [dispatch]);

  //refactoring dates
  let a =
    dates.length > 0
      ? moment(dates[0], "DD/MM/YYYY").toDate()
      : moment(operation_info?.date_from, "DD/MM/YYYY").toDate();
  let date_from = moment(a).format("DD/MM");
  let c =
    dates.length > 0
      ? moment(dates[1], "DD/MM/YYYY").toDate()
      : moment(operation_info?.date_to, "DD/MM/YYYY").toDate();
  let date_to = moment(c).format("DD/MM");

  let release_type_choices = useSelector(
    (state: AppStateType) => state.booking.release_type_choices
  );

  let recalculated_charges = useSelector(
    (state: AppStateType) => state.client_operations.recalculated_charges
  );

  let cargo_groups = useSelector(
    (state: AppStateType) => state.client_operations.operationCargoGroups
  );

  let error_date = useSelector(
    (state: AppStateType) => state.booking.booking_dates_error
  );

  const {
    handleSubmit,
    register,
    control,
    getValues,
    errors,
    reset,
  } = useForm();

  const onSubmit = (values: any) => {
    const new_groups = cargo_groups.map((c) => ({
      ...c,
      container_type: c.container_type?.id,
      packaging_type: c.packaging_type?.id,
    }));

    const formatted_date_from = moment(dates[0]).format("DD/MM/YYYY");
    const formatted_date_to = moment(dates[1]).format("DD/MM/YYYY");

    if (operation_info.can_be_patched) {
      const patchObj = {};
      const hasCargoDifference =
        _.differenceWith(cargo_groups, operation_info.cargo_groups, _.isEqual)
          .length > 0;

      if (hasCargoDifference) {
        patchObj["cargo_groups"] = new_groups;
      }
      if (
        dates.length > 0 &&
        formatted_date_from !== operation_info.date_from
      ) {
        patchObj["date_from"] = formatted_date_from;
      }

      if (dates.length > 0 && formatted_date_to !== operation_info.date_to) {
        patchObj["date_to"] = formatted_date_to;
      }

      if (
        operation_info.release_type &&
        operation_info.release_type.id !== values.release_type
      ) {
        patchObj["release_type"] = values.release_type;
      }

      if (
        operation_info.number_of_documents &&
        operation_info.number_of_documents !==
          Number(values.number_of_documents)
      ) {
        patchObj["number_of_documents"] = values.number_of_documents;
      }

      Object.keys(patchObj).length > 0 &&
        dispatch(changeBooking(operation_info.id, patchObj, setIsOpen));
    } else {
      const postObj = {
        aceid: operation_info.aceid,
        cargo_groups: new_groups,
        date_from:
          dates.length > 0 ? formatted_date_from : operation_info.date_from,
        date_to: dates.length > 0 ? formatted_date_to : operation_info.date_to,
        release_type: values.release_type,
        number_of_documents: values.number_of_documents,
        freight_rate: operation_info.freight_rate.id,
        shipper: operation_info.shipper?.id,
        original_booking: operation_info.id,
        payment_due_by: operation_info.payment_due_by,
      };
      dispatch(
        editOperationByClientThunk(operation_info.id, postObj, setIsOpen)
      );
    }

    // setIsOpen(false);
  };

  const reCalcOnVolumeChange = (vol: string, index: number) => {
    let edited_groups = cargo_groups.map((c, i) => {
      const newObj = { ...c };
      if (i === index) {
        newObj.volume = Number(vol);
        return newObj;
      } else {
        return newObj;
      }
    });

    dispatch(clientOperationsActions.setOperationCargoGroups(edited_groups));
    let pack_id_groups = edited_groups.map((group) => ({
      ...group,
      container_type: group.container_type?.id,
      packaging_type: group.packaging_type?.id,
    }));
    console.log("pack_id_groups", pack_id_groups);
    dispatch(
      recalculateCharges(
        operation_info.id,
        {
          number_of_documents: getValues("number_of_documents"),
          cargo_groups: pack_id_groups,
        },
        Number(operation_info.freight_rate.shipping_mode.id)
      )
    );
  };

  const reCalcOnGroupsAmountChange = (newCargoData: any) => {
    let pack_id_groups = newCargoData.map((group: any) => ({
      ...group,
      container_type: group.container_type?.id,
      packaging_type: group.packaging_type?.id,
    }));
    dispatch(
      recalculateCharges(
        operation_info.id,
        {
          number_of_documents: getValues("number_of_documents"),
          cargo_groups: pack_id_groups,
        },
        Number(operation_info.freight_rate.shipping_mode.id)
      )
    );
  };

  const reCalcOnDocumentChange = () => {
    let pack_id_groups = cargo_groups.map((group: any) => ({
      ...group,
      container_type: group.container_type?.id,
      packaging_type: group.packaging_type?.id,
    }));

    dispatch(
      recalculateCharges(
        operation_info.id,
        {
          number_of_documents: getValues("number_of_documents"),
          cargo_groups: pack_id_groups,
        },
        Number(operation_info.freight_rate.shipping_mode.id)
      )
    );
  };

  const editGroupAndRecalculate = (data: any) => {
    const changed_array = cargo_groups.map((gr, idx) => {
      if (idx === editableGroupIndex) {
        return data;
      } else {
        return gr;
      }
    });
    let pack_id_groups = changed_array.map((group) => {
      if (group.packaging_type?.hasOwnProperty("id")) {
        return { ...group, packaging_type: group.packaging_type?.id };
      } else if (group.container_type?.hasOwnProperty("id")) {
        return { ...group, container_type: group.container_type?.id };
      } else {
        return group;
      }
    });

    dispatch(
      recalculateCharges(
        operation_info.id,
        {
          number_of_documents: getValues("number_of_documents"),
          cargo_groups: pack_id_groups,
        },
        Number(operation_info.freight_rate.shipping_mode.id)
      )
    );
  };

  const clearDatesError = () => {
    dispatch(bookingActions.setChangeBookingError(null));
  };
  const {t} = useTranslation();
  return (
    <PopupContainer>
      <PopupContent>
        <CloseBtn onClick={() => setIsOpen(false)}>
          <img src={close} alt="" />
        </CloseBtn>
        <HeadingWrap>
          <Heading>{t("Bookings/REQUEST CHANGE")}</Heading>
          <HeadingText>
            {t("Booking Confirmation/This action_recalculate")}
          </HeadingText>
        </HeadingWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          {operation_info.release_type && (
            <SectionWrapper>
              <SectionTitle>{t("Booking Confirmation/Documents")}</SectionTitle>
              <div style={{ display: "flex" }}>
                <InfoRow margin_right="25px">
                  <InfoRowLabel>{t("Bookings/RELEASE TYPE")}</InfoRowLabel>
                  <Controller
                    name="release_type"
                    control={control}
                    defaultValue={operation_info.release_type?.id}
                    as={
                      <SurchargeRateSelect
                        options={release_type_choices}
                        placeholder={t("Bookings/Release type")}
                      />
                    }
                  />
                </InfoRow>
                <InfoRow>
                  <InfoRowLabel>{t("Operations/NO. OF DOCUMENTS")}</InfoRowLabel>
                  <div style={{ paddingTop: "9px" }}>
                    <FormField
                      inputRef={register({
                        required: "Field is required",
                        min: 1,
                      })}
                      placeholder={t("Operations/No. of Documents")}
                      name="number_of_documents"
                      defaultValue={operation_info.number_of_documents}
                      error={errors?.number_of_documents}
                      onBlur={() => {
                        reCalcOnDocumentChange();
                      }}
                    />
                  </div>
                </InfoRow>
              </div>
            </SectionWrapper>
          )}
          {operation_info.freight_rate.origin.is_local && (
            <SectionWrapper>
              <SectionTitle>{t("Bookings/DATES")}</SectionTitle>
              <GeneralBookingContent>
                <div style={{ display: "flex" }}>
                  <CalendarIcon style={{ width: "87px", height: "96px" }}>
                    <img src={calendar_icon} alt="" />
                  </CalendarIcon>
                  <InfoRow margin_right="50px" margin_bottom="0px">
                    <InfoRowLabel>{t("Quotes/SHIPMENT DATE")}</InfoRowLabel>
                    <div style={{ marginBottom: "7px" }}>
                      <Dates
                        setDates={setDates}
                        extraDateNumber={
                          operation_info.shipping_type === "sea" ? 9 : 2
                        }
                        dates={dates}
                        disabled={false}
                        placeholder={`${t("Bookings/WEEK")} ${operation_info.week_range?.week_from} - ${t("Bookings/WEEK")} ${operation_info.week_range?.week_to}`}
                        width={"auto"}
                        openCallback={clearDatesError}
                      />
                    </div>
                    <InfoRowValue>
                      {date_from} - {date_to}
                    </InfoRowValue>
                  </InfoRow>
                </div>
              </GeneralBookingContent>
              {error_date && <DatesError>{error_date}</DatesError>}
            </SectionWrapper>
          )}

          <SectionWrapper>
            <SectionTitle>{t("Bookings/CARGO")}</SectionTitle>
            <ShippingModeText>
              {operation_info.freight_rate.shipping_mode.title}
            </ShippingModeText>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  {operation_info.freight_rate.shipping_mode.id ===
                  ShippingModeEnum.FCL ? (
                    <TableRow>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/VOLUME")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Quote bid screen/CONTAINER TYPE")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Booking process/CARGO DESCRIPTION")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/VOLUME")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Booking process/TOTAL W/M")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {operation_info.freight_rate.shipping_mode.id ===
                        ShippingModeEnum.ULD
                          ? t("Quote bid screen/CONTAINER TYPE")
                          : t("Bookings/PACKAGING TYPE")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/HEIGHT, WIDTH, LENGTH, WEIGHT")}
                      </TableCell>
                      <TableCell className={classes.cell} align="left">
                        {t("Bookings/CARGO DESCRIPTIONS")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {cargo_groups.map((c, index) => (
                    <TableRow key={index} className={classes.row}>
                      {operation_info.freight_rate.shipping_mode.id ===
                      ShippingModeEnum.FCL ? (
                        <>
                          <TableCell className={classes.innerCell} align="left">
                            <FormField
                              inputRef={register}
                              name={`volume.${index}`}
                              defaultValue={c.volume}
                              max_width={"100px"}
                              marginBottom={"0px"}
                              onBlur={() => {
                                reCalcOnVolumeChange(
                                  getValues(`volume.${index}`),
                                  index
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.container_type?.code}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.description}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className={classes.innerCell} align="left">
                            {c.volume}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.total_wm}w/m
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {operation_info.freight_rate.shipping_mode.id ===
                            ShippingModeEnum.ULD
                              ? c.container_type?.code
                              : c.packaging_type?.description}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {`${c.height}${c.length_measurement}/
                            ${c.width}${c.length_measurement}/
                            ${c.length}${c.length_measurement}/
                            ${c.weight}${c.weight_measurement}`}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            {c.description}
                          </TableCell>
                          <TableCell className={classes.innerCell} align="left">
                            <BaseTooltip title={"Change cargo group"}>
                              <div
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  setEditableGroupIndex(index);
                                  setAddGroupMode(true);
                                }}
                              >
                                <EditTwoTone />
                              </div>
                            </BaseTooltip>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionWrapper>
          {operation_info.freight_rate.shipping_mode.id !==
            ShippingModeEnum.FCL &&
            operation_info.freight_rate.shipping_mode.id !==
              ShippingModeEnum.ULD && (
              <div style={{ marginTop: "15px" }}>
                <AddImg
                  onClick={() => {
                    setAddGroupMode(true);
                  }}
                  src={AddIcon}
                  alt="add"
                />
              </div>
            )}
          {recalculated_charges && !addGroupMode && (
            <SectionWrapper>
              <SectionTitle>{t("Billing/CHARGES")}</SectionTitle>
              <div>
                <div style={{ padding: "12px 18px", marginBottom: "30px" }}>
                  <InfoRow margin_right="25px">
                    <InfoRowLabel font_color={"#1ab8e5"}>
                      {t("Booking process/BEFORE REQUEST")}
                    </InfoRowLabel>
                    <ChargesChangeTable
                      operation_charges={operation_info.charges}
                      number_of_docs={operation_info?.number_of_documents}
                    />
                  </InfoRow>
                </div>
                <div
                  style={{
                    border: "1px solid #1AB8E5",
                    padding: "12px 18px",
                  }}
                >
                  <InfoRow margin_right="25px">
                    <InfoRowLabel font_color={"#1ab8e5"}>
                      {t("Booking process/AFTER REQUEST")}
                    </InfoRowLabel>
                    <ChargesChangeTable
                      operation_charges={recalculated_charges}
                      number_of_docs={getValues("number_of_documents")}
                    />
                  </InfoRow>
                </div>
              </div>
            </SectionWrapper>
          )}
          <ButtonsWrap>
            <ConfirmButton style={{textTransform: "uppercase"}} type="submit">{t("Dashboard/Request")}</ConfirmButton>
            <CancelButton onClick={() => setIsOpen(false)}>{t("Bookings/CANCEL")}</CancelButton>
          </ButtonsWrap>
        </form>
        <ModalWindow isOpen={addGroupMode}>
          <ClientChangeRequestPopUpForm
            setIsOpen={setAddGroupMode}
            operation_info={operation_info}
            group={cargo_groups[editableGroupIndex]}
            reCalcOnGroupsAmountChange={reCalcOnGroupsAmountChange}
            reCalcOnVolumeChange={reCalcOnVolumeChange}
            setEditableGroupIndex={setEditableGroupIndex}
            editGroupAndRecalculate={editGroupAndRecalculate}
          />
        </ModalWindow>
      </PopupContent>
    </PopupContainer>
  );
};

export default ClientOperationChangeRequestPopUp;
