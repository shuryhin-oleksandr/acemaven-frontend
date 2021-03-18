import React, { useState } from "react";
//react hook form
import { Controller } from "react-hook-form";
//material ui
import { IconButton } from "@material-ui/core";
//types
import { ContainerType } from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import { ChoiceType } from "../../../../../../_BLL/types/search/search_types";
//components
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../../components/_commonComponents/Input/FormField";
import SearchCheckbox from "src/_UI/components/_commonComponents/customCheckbox/searchCheckbox";
//icons
import RemoveIcon from "../../../../../assets/icons/widgets/remove-icon.svg";

type PropsType = {
  fields: any;
  control: any;
  container_types: ContainerType[];
  remove: any;
  item: any;
  index: number;
  register: any;
  frozen_choices: ChoiceType[] | null;
  errors: any;
  disabled?: any;
};

const FCLField: React.FC<PropsType> = ({
  control,
  item,
  index,
  container_types,
  fields,
  remove,
  register,
  frozen_choices,
  errors,
  disabled,
}) => {
  const [chosenContainer, setChosenContainer] = useState(0);
  let finded =
    container_types?.length > 0 &&
    container_types.find((c) => c.id === chosenContainer);
  const [isCheck, setIsCheck] = useState(false);

  return (
    <>
      <div style={{ gridColumnStart: 1 }}>
        <Controller
          control={control}
          name={`cargo_groups[${index}].container_type`}
          defaultValue={item.container_type}
          rules={{
            required: "Field is required",
          }}
          as={
            <SurchargeRateSelect
              error={errors?.shipping_mode?.message}
              options={container_types}
              background="#ECECEC"
              callback={setChosenContainer}
              disabled={disabled}
              placeholder="Container Type"
              margin_bottom={"0px"}
              hideLabel={true}
              small_size={true}
              without_border={true}
            />
          }
        />
      </div>
      <Controller
        defaultValue={item.volume}
        control={control}
        name={`cargo_groups[${index}].volume`}
        rules={{
          required: "Field is required",
        }}
        as={
          <div
            style={{
              // marginRight: "16px",
              // maxWidth: "18%",
              display: "flex",
            }}
          >
            <FormField
              background="#ECECEC"
              marginBottom="5px"
              type="number"
              disabled={disabled}
              placeholder="Volume"
              height={"31px"}
              without_border={true}

            />
          </div>
        }
      />
      {finded && finded?.is_frozen ? (
        <Controller
          control={control}
          name={`cargo_groups[${index}].frozen`}
          defaultValue="frozen"
          as={
            <SurchargeRateSelect
              background="#ECECEC"
              options={frozen_choices}
              disabled={disabled}
              placeholder="Frozen"
              margin_bottom={"0px"}
              hideLabel={true}
              small_size={true}
              without_border={true}

            />
          }
        />
      ) : (
        <SearchCheckbox
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          name={`cargo_groups[${index}].dangerous`}
          inputref={register}
          labelText="Dangerous"
          disabled={disabled}
        />
      )}
      {fields.length > 1 && !disabled && (
        <IconButton
          style={{
            justifySelf: "flex-start",
            alignSelf: "center",
          }}
          onClick={() => remove(index)}
        >
          <img src={RemoveIcon} alt="remove" />
        </IconButton>
      )}
      {fields.length > 1 && index !== fields.length - 1 && (
        <div
          style={{
            gridColumn: "1/-1",
            height: "1px",
            backgroundColor: "#E0E0E0",
            marginBottom: "5px",
          }}
        />
      )}
    </>
  );
};

export default FCLField;
