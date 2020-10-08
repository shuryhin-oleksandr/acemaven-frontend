import React, { FC } from "react";
import { Tooltip } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  customTooltip: {
    "& .MuiTooltip-arrow::before": {
      backgroundColor: "rgba(59, 59, 65, 0.9)",
    },
    maxWidth: 330,

    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    backgroundColor: "rgba(59, 59, 65, 0.9)",
  },
});

type PropsType = {
  title: string;
  children: any;
};

const BaseTooltip: React.FC<PropsType> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title} arrow classes={{ tooltip: classes.customTooltip }}>
      {children}
    </Tooltip>
  );
};

export default BaseTooltip;
