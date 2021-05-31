import React from "react";
//react-redux
import { useSelector } from "react-redux";
//react-router-dom
import { useHistory } from "react-router-dom";
//material ui
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
//BLL
import { getAgentsOperationsListSelector } from "../../../../../_BLL/selectors/operations/agentOperationsSelector";
//helpers
import { getTwoLastElementsHelper } from "../../../../../_BLL/helpers/widgets/getTwoLastElementsHelper";
//types
import { ShippingTypesEnum } from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//components
import BaseWidget from "../BaseWidgetContainer/BaseWidgetContainer";
//styles
import { useStyles } from "../WidgetTableStyles";
//icons
import ShipIcon from "../../../../assets/icons/widgets/widget-ship-icon.svg";
import PlaneIcon from "../../../../assets/icons/widgets/widget-plane-icon.svg";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";

const OperationsInProgressWidget: React.FC = () => {
  //hooks
  const classes = useStyles();
  const history = useHistory();

  //data from store
  let operations_list = useSelector(getAgentsOperationsListSelector);

  //local state (get last 2 elements from an array)
  let latest_list = getTwoLastElementsHelper(operations_list);

  //handlers
  const goToPage = (id: number) => {
    history.push(`/operations/${id}`);
  };
  const { t } = useTranslation();
  return (
    <>
      {operations_list.length > 0 ? (
        <BaseWidget heading={t("Dashboard/Operations in progress")}>
          <div style={{ height: 210, overflowY: "auto" }}>
            <ScrollbarStyled>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell} align="left" />
                  <TableCell className={classes.cell} align="left">
                    {t("Dashboard/Reservation No.")}
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    {t("Dashboard/Route")}
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    {t("Dashboard/Date")}
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    {t("Dashboard/Status")}
                  </TableCell>
                  <TableCell className={classes.cell} align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {operations_list.map((operation, index: number) => (
                  <TableRow
                    key={operation?.id + index}
                    className={classes.row}
                    onClick={() => goToPage(operation?.id)}
                  >
                    <TableCell className={classes.pageCell}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingRight: 10,
                        }}
                      >
                        <img
                          src={
                            operation?.shipping_type === ShippingTypesEnum.SEA
                              ? ShipIcon
                              : PlaneIcon
                          }
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell className={classes.boldCell} align="left">
                      {/*{operation?.shipment_details &&*/}
                      {/*operation?.shipment_details.length > 0*/}
                      {/*  ? operation?.shipment_details[0].booking_number*/}
                      {/*  : "-"}*/}
                      {operation?.aceid}
                    </TableCell>
                    <TableCell className={classes.innerCell} align="left">
                      {operation?.freight_rate.origin.code} -{" "}
                      {operation?.freight_rate.destination.code}
                    </TableCell>
                    <TableCell className={classes.innerCell} align="left">
                      {moment(operation.date_from.slice(6)).format("DD/MM")}
                    </TableCell>
                    <TableCell className={classes.innerCell} align="left">
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100px",
                        }}
                      >
                        {t(`Statuses/${operation?.status}`)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </ScrollbarStyled>
          </div>
        </BaseWidget>
      ) : null}
    </>
  );
};

export default OperationsInProgressWidget;
