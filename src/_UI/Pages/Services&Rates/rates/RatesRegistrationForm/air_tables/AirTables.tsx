import React from "react";

import {
  CurrencyType,
  ShippingModeType,
} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import CommonRateTable from "../sea_tables/CommonRateTable";
import ULDTables from "./ULDTables";

type PropsType = {
  ship_mode?: ShippingModeType | null;
  register?: any;
  control?: any;
  currency_list: CurrencyType[] | null;
  shipping_value?: number;
};

const AirTables: React.FC<PropsType> = ({
  shipping_value,
  ship_mode,
  currency_list,
}) => {
  console.log("ship_mode", ship_mode);
  return shipping_value === 2 ? (
    <ULDTables ship_mode={ship_mode} currency_list={currency_list} />
  ) : (
    <CommonRateTable />
  );
};

export default AirTables;
