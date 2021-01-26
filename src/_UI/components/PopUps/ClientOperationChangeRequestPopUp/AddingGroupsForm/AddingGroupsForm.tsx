import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CalculationWrapper,
  ChargeableWeightInner,
  CheckboxWrap,
  FormRow,
  WeightIcon,
  WeightWrapper,
} from "../../chargable_weight/chargeable-weght-popup-styles";
import FormSelect from "../../../_commonComponents/select/FormSelect";
import FormField from "../../../_commonComponents/Input/FormField";
import weight from "../../../../assets/icons/widgets/weight.svg";
import {
  ActionsWrapRadio,
  CommonWrap,
  RadioLabel,
} from "../../../_commonComponents/settingsNotification/settings-notification-styles";
import Radio from "@material-ui/core/Radio";
import height from "../../../../assets/icons/widgets/height.svg";
import length from "../../../../assets/icons/widgets/length.svg";
import width from "../../../../assets/icons/widgets/width.svg";
import { makeStyles } from "@material-ui/core/styles";
import GeneralCustomCheckbox from "../../../_commonComponents/customCheckbox/GeneralCustomCheckbox";
import { InnerWrapper } from "./adding-groups-styles";
import {
  EditButtonsWrapper,
  FormOperationButton,
  InfoRowLabel,
} from "../../../../Pages/Requests/Booking_agent/booking_card/booking-card-style";
import close_icon from "../../../../assets/icons/profile/closeForm.svg";
import save_icon from "../../../../assets/icons/profile/add.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../../_BLL/store";
import { calculateAdditionalCargoGroup } from "../../../../../_BLL/thunks/operations/client/OperationsClientThunk";

let useStyles = makeStyles({
  root: {
    color: "#115b86",
    padding: "0",
    marginBottom: "3px",

    "&.Mui-checked": {
      color: "#115b86",
    },
  },
});

type PropsType = {
  setAddGroupMode: (value: boolean) => void;
  shipping_mode: number;
  shipping_type: string;
  reCalcOnGroupsAmountChange: any;
};

const AddingGroupsForm: React.FC<PropsType> = ({
  setAddGroupMode,
  shipping_mode,
  shipping_type,
  reCalcOnGroupsAmountChange,
}) => {
  const [selectedValueWeight, setSelectedValueWeight] = React.useState("t");
  const [selectedValueLength, setSelectedValueLength] = React.useState("m");
  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueWeight(event.target.value);
  };
  const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueLength(event.target.value);
  };

  let container_types_air = useSelector(
    (state: AppStateType) => state.client_operations.container_types_air
  );

  let packaging_types = useSelector(
    (state: AppStateType) => state.client_operations.packaging_types
  );

  const { handleSubmit, register, control, errors, setValue } = useForm();
  const onSubmit = (values: any) => {
    dispatch(
      calculateAdditionalCargoGroup(
        { ...values, shipping_type: shipping_type },
        shipping_mode,
        reCalcOnGroupsAmountChange
      )
    );
    setAddGroupMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <EditButtonsWrapper top="10px">
          <FormOperationButton
            type="button"
            onClick={() => setAddGroupMode(false)}
            style={{ padding: "5px" }}
          >
            <img src={close_icon} alt="" />
          </FormOperationButton>
          <FormOperationButton type="submit" style={{ padding: "5px" }}>
            <img src={save_icon} alt="" />
          </FormOperationButton>
        </EditButtonsWrapper>
        <InnerWrapper>
          <FormRow>
            {shipping_mode === 2 ? (
              <Controller
                name="container_type"
                control={control}
                defaultValue=""
                rules={{
                  required: "Field is required",
                }}
                as={
                  <FormSelect
                    error={errors?.container_type?.message}
                    label="ULD type"
                    placeholder="Placeholder"
                    maxW="140px"
                    options={container_types_air}
                  />
                }
              />
            ) : (
              <Controller
                name="packaging_type"
                control={control}
                defaultValue=""
                rules={{
                  required: "Field is required",
                }}
                as={
                  <FormSelect
                    error={errors?.packaging_type?.message}
                    label="Packaging type"
                    placeholder="Placeholder"
                    maxW="140px"
                    options={packaging_types}
                  />
                }
              />
            )}
            <FormField
              error={errors?.volume}
              label="No. of packs"
              max_width="135px"
              type="number"
              inputRef={register({ required: true })}
              disabled={shipping_mode === 2}
              defaultValue={1}
              name="volume"
            />
            <Controller
              name="weight"
              control={control}
              defaultValue={""}
              rules={{
                required: "Field is required",
              }}
              as={
                <WeightWrapper>
                  <WeightIcon>
                    <img src={weight} alt="" />
                  </WeightIcon>
                  <FormField
                    error={errors?.weight}
                    label={
                      selectedValueWeight === "kg" ? "Weight, kgs" : "Weight, t"
                    }
                    max_width="90px"
                    placeholder={
                      selectedValueWeight === "kg" ? "0, kg" : "0, t"
                    }
                    type="number"
                    defaultValue={""}
                  />
                </WeightWrapper>
              }
            />
            <Controller
              name="weight_measurement"
              control={control}
              defaultValue={"t"}
              as={
                <ActionsWrapRadio>
                  <CommonWrap>
                    <Radio
                      checked={selectedValueWeight === "kg"}
                      onChange={handleChangeWeight}
                      value="kg"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "kg" }}
                      className={classes.root}
                      size="small"
                    />
                    <RadioLabel>kg</RadioLabel>
                  </CommonWrap>
                  <CommonWrap>
                    <Radio
                      checked={selectedValueWeight === "t"}
                      onChange={handleChangeWeight}
                      value="t"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "t" }}
                      className={classes.root}
                      size="small"
                    />
                    <RadioLabel>t</RadioLabel>
                  </CommonWrap>
                </ActionsWrapRadio>
              }
            />
          </FormRow>
          <FormRow>
            <Controller
              name="height"
              control={control}
              defaultValue=""
              rules={{
                required: "Field is required",
              }}
              as={
                <WeightWrapper>
                  <WeightIcon>
                    <img src={height} alt="" />
                  </WeightIcon>
                  <FormField
                    error={errors?.height}
                    label={
                      selectedValueLength === "cm" ? "Height, cm" : "Height, m"
                    }
                    max_width="90px"
                    placeholder={
                      selectedValueLength === "cm" ? "0, cm" : "0, m"
                    }
                    type="number"
                    defaultValue={""}
                  />
                </WeightWrapper>
              }
            />
            <Controller
              name="length"
              control={control}
              defaultValue=""
              rules={{
                required: "Field is required",
              }}
              as={
                <WeightWrapper>
                  <WeightIcon>
                    <img src={length} alt="" />
                  </WeightIcon>
                  <FormField
                    error={errors?.length}
                    label={
                      selectedValueLength === "cm" ? "Length, cm" : "Length, m"
                    }
                    max_width="90px"
                    placeholder={
                      selectedValueLength === "cm" ? "0, cm" : "0, m"
                    }
                    type="number"
                    defaultValue={""}
                  />
                </WeightWrapper>
              }
            />
            <Controller
              name="width"
              control={control}
              defaultValue=""
              rules={{
                required: "Field is required",
              }}
              as={
                <WeightWrapper>
                  <WeightIcon>
                    <img src={width} alt="" />
                  </WeightIcon>
                  <FormField
                    error={errors?.width}
                    label={
                      selectedValueLength === "cm" ? "Width, cm" : "Width, m"
                    }
                    max_width="90px"
                    placeholder={
                      selectedValueLength === "cm" ? "0, cm" : "0, m"
                    }
                    type="number"
                    defaultValue={""}
                  />
                </WeightWrapper>
              }
            />
            <Controller
              name="length_measurement"
              control={control}
              defaultValue="m"
              as={
                <ActionsWrapRadio>
                  <CommonWrap>
                    <Radio
                      checked={selectedValueLength === "cm"}
                      onChange={handleChangeLength}
                      value="cm"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "cm" }}
                      className={classes.root}
                      size="small"
                    />
                    <RadioLabel>cm</RadioLabel>
                  </CommonWrap>
                  <CommonWrap>
                    <Radio
                      checked={selectedValueLength === "m"}
                      onChange={handleChangeLength}
                      value="m"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "m" }}
                      className={classes.root}
                      size="small"
                    />
                    <RadioLabel>m</RadioLabel>
                  </CommonWrap>
                </ActionsWrapRadio>
              }
            />
          </FormRow>
          <CheckboxWrap>
            <GeneralCustomCheckbox
              inputRef={register}
              name="dangerous"
              value={isCheck}
              //setIsDangerous={setIsDangerous}
              setValue={setValue}
              setIsCheck={setIsCheck}
              span_text="Dangerous"
            />
          </CheckboxWrap>
          <InfoRowLabel>Description</InfoRowLabel>
          <FormField
            error={errors?.description}
            max_width="100%"
            inputRef={register({
              required: "Field is required",
            })}
            defaultValue={""}
            name="description"
          />
        </InnerWrapper>
      </div>
    </form>
  );
};

export default AddingGroupsForm;
