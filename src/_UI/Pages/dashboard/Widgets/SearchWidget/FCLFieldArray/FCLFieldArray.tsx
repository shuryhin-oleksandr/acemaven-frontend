import React, { useEffect, useState } from "react";
import FCLField from "./FCLField";

type PropsType = {
  fields: any;
  control: any;
  container_types: any;
  remove: any;
};

const FCLFieldArray: React.FC<PropsType> = ({
  fields,
  control,
  container_types,
  remove,
}) => {
  return fields.map((item: any, index: number) => {
    return (
      <FCLField
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
