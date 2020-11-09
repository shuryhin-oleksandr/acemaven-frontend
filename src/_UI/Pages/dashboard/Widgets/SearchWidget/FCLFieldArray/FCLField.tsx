import React, { useState } from "react";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../../components/_commonComponents/Input/FormField";
import { RemoveImg } from "../searchWidgett-styles";
import RemoveIcon from "../../../../../assets/icons/widgets/remove-icon.svg";
import { ContainerType } from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SearchCheckbox from "src/_UI/components/_commonComponents/customCheckbox/searchCheckbox";
import { ChoiceType } from "../../../../../../_BLL/types/search/search_types";

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
    <div
      style={{
        width: "100%",
        display: "flex",
        borderBottom: "1px solid #E0E0E0",
        alignItems: "center",
      }}
    >
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
            maxW="140px"
            marginRight="16px"
            background="#ECECEC"
            callback={setChosenContainer}
            disabled={disabled}
          />
        }
      />
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
              marginRight: "10px",
              width: "130px",
              display: "flex",
            }}
          >
            <FormField background="#ECECEC" marginBottom="5px" type="number" disabled={disabled} />
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
              maxW="123px"
              options={frozen_choices}
              disabled={disabled}
            />
          }
        />
      ) : (
        <SearchCheckbox
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          name={`cargo_groups[${index}].can_be_dangerous`}
          inputref={register}
          labelText="DANGEROUS"
          disabled={disabled}
        />
      )}
      {fields.length > 1 && !disabled && (
        <RemoveImg
          src={RemoveIcon}
          alt="remove"
          onClick={() => remove(index)}
        />
      )}
    </div>
  );
};

export default FCLField;
