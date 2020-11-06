import React from "react";
import FCLField from "./FCLField";
import { ChoiceType } from "../../../../../../_BLL/types/search/search_types";

type PropsType = {
  fields: any;
  control: any;
  container_types: any;
  remove: any;
  register: any;
  frozen_choices: ChoiceType[] | null;
  errors: any;
  disabled?: any;
};

const FCLFieldArray: React.FC<PropsType> = ({
  fields,
  control,
  container_types,
  remove,
  register,
  frozen_choices,
  errors,
  disabled,
}) => {
  return fields.map((item: any, index: number) => {
    return (
      <FCLField
        key={item.id}
        register={register}
        fields={fields}
        control={control}
        container_types={container_types}
        remove={remove}
        item={item}
        index={index}
        frozen_choices={frozen_choices}
        errors={errors}
        disabled={disabled}
      />
    );
  });
};

export default FCLFieldArray;
