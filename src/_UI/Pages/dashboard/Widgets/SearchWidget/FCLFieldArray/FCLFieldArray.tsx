import React from "react";
import FCLField from "./FCLField";

type PropsType = {
  fields: any;
  control: any;
  container_types: any;
  remove: any;
  register: any
};

const FCLFieldArray: React.FC<PropsType> = ({
  fields,
  control,
  container_types,
  remove,
    register
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
      />
    );
  });
};

export default FCLFieldArray;
