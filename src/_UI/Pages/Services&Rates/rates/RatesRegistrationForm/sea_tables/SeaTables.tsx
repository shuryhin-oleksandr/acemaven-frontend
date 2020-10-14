import React from "react";
import FCLTables from "./FCLTables";
import {
  CurrencyType,
  ShippingModeType,
} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import CommonRateTable from "./CommonRateTable";

type PropsType = {
  ship_mode?: ShippingModeType | null;
  register?: any;
  control?: any;
  currency_list: CurrencyType[] | null;
  shipping_value?: number;
  errors?: any;
  setValue?: any
};

const SeaTables: React.FC<PropsType> = ({
  shipping_value,
  ship_mode,
  currency_list, ...props
}) => {
  console.log("ship_mode", ship_mode);
  return shipping_value === 3 ? (
    <FCLTables ship_mode={ship_mode}
               currency_list={currency_list}
               control={props.control}
               errors={props.errors}
               setValue={props.setValue}
    />
  ) : (
    <CommonRateTable/>
  );
};

export default SeaTables;
