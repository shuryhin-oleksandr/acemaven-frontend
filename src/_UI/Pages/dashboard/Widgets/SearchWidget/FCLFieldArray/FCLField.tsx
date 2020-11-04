import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../../../components/_commonComponents/Input/FormField";
import { RemoveImg } from "../searchWidgett-styles";
import RemoveIcon from "../../../../../assets/icons/widgets/remove-icon.svg";
import {ContainerType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SearchCheckbox from "src/_UI/components/_commonComponents/customCheckbox/searchCheckbox";

type PropsType = {
  fields: any;
  control: any;
  container_types: ContainerType[];
  remove: any;
  item: any;
  index: number;
};

const FCLField: React.FC<PropsType> = ({
  control,
  item,
  index,
  container_types,
  fields,
  remove,
}) => {
  const [chosenContainer, setChosenContainer] = useState(0);
  let finded = container_types.find(c => c.id === chosenContainer)
    console.log('finded', finded)

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
            callback={setChosenContainer}
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
            <FormField background="#ECECEC" marginBottom="5px" type="number" />
          </div>
        }
      />
        {finded && finded.is_frozen
            ? <Controller
                control={control}
                name={`search_test[${index}].is_frozen`}
                defaultValue="frozen"
                as={<SurchargeRateSelect background="#ECECEC" maxW="115px" />}
            />
            :
            //name={`search_test[${index}].can_be_dangerous`}
                <div>danger</div>
        }

      {fields.length > 1 && (
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
