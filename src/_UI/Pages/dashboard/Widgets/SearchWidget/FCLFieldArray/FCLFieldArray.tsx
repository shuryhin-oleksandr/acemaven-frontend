import React from "react";
import FCLField from "./FCLField";
import {ChoiceType} from "../../../../../../_BLL/types/search/search_types";

type PropsType = {
  fields: any;
  control: any;
  container_types: any;
  remove: any;
  register: any;
  frozen_choices:ChoiceType[] | null
};

const FCLFieldArray: React.FC<PropsType> = ({
  fields,
  control,
  container_types,
  remove,
  register,
  frozen_choices,
}) => {
  return fields.map((item: any, index: number) => {
    return (
      <FCLField
        register={register}
        fields={fields}
        control={control}
        container_types={container_types}
        remove={remove}
        item={item}
        index={index}
        frozen_choices={frozen_choices}
      />
    );
  });
};

export default FCLFieldArray;
