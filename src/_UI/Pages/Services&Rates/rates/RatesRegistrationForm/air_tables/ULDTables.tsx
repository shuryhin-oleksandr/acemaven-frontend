import React from "react";
import {
  CurrencyType,
  ShippingModeType,
} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {
  HandlingSurchargeContainer,
  HandlingTitle,
} from "../../../surcharge/SurchargeRegistrationForm/sea_containerized_cargo/sea-conteneraized-cargo-styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { Controller } from "react-hook-form";
import SurchargeRateSelect from "../../../../../components/_commonComponents/select/SurchargeRateSelect";
import { Field } from "../../../../../components/_commonComponents/Input/input-styles";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
    width: 760,
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #115B86",
  },
  innerMainCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    color: "#115B86",
    width: "213px",
    padding: "8px 0 0",
  },
  innerCell: {
    borderBottom: "1px solid #E0E0E0;",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    padding: "8px 0 0",
  },
});

type PropsType = {
  ship_mode?: ShippingModeType | null;
  register?: any;
  control?: any;
  currency_list: CurrencyType[] | null;
  shipping_value?: number;
};

const ULDTables: React.FC<PropsType> = ({ ship_mode }) => {
  let containers = ship_mode?.container_types;
  console.log("containers", containers);
  const classes = useStyles();

  return (
    <div>
      <HandlingTitle>Rates</HandlingTitle>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>CONTAINER TYPE </TableCell>
              <TableCell className={classes.cell} align="left">
                CURRENCY
              </TableCell>
              <TableCell className={classes.cell} align="left">
                RATE
              </TableCell>
              <TableCell className={classes.cell} align="left">
                Start Date
              </TableCell>
              <TableCell className={classes.cell} align="left">
                Expiration Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {containers?.map((container) => (
              <TableRow key={container.id}>
                <TableCell
                  className={classes.innerCell}
                  component="th"
                  scope="row"
                >
                  {container.code}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ULDTables;
