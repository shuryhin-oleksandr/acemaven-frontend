import React from "react";
import { Label } from "../Input/input-styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components";
import Item from "./Item";

type IProps = {
    label?: string;
    error?: string;
    options?: any;
    placeholder?: string;
    callback?: (value: any) => void;
    maxW?: string;
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
        /*marginBottom: '10px'*/
    },
    selectEmpty: {
        maxWidth: '80px',
        width: "100%",
        height: "40px",
        color: "#828282",
        fontSize: "14px",
        fontFamily: "Helvetica Light",
        fontStyle: "normal",
        transition: ".3",


        "& .MuiSelect-icon": {
            color: "rgba(0, 0, 0, 0.23)",
        },

        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderWidth: "1px",
            zIndex: 100,
        },

        "&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
            transition: ".3s",
            borderColor: "#7C7C89",
            background: "#ECECEC",
            "z-index": -1,
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.23)",
        },

        "& .MuiSelect-select": {
            paddingLeft: "10px",
            "&:focus": {
                background: "none",
            },
        },
    },
    helperText: {
        textAlign: "right",
        fontWeight: 500,
        fontFamily: "Helvetica Reg, sans-serif",

        "&.Mui-error": {
            color: "red",
        },
    },
    customTooltip: {
        "& .MuiTooltip-arrow::before": {
            backgroundColor: "#FFFFFF",
            border: "1px solid #828282",
        },
        borderRadius: "4px",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        border: "1px solid #828282",
        padding: "20px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100000
    },
    menu_item: {
        display: 'flex',
        position: 'relative'
    }
}));

const SurchargeRateConditionsSelect: React.FC<IProps> = ({ label, error, ...props }) => {
    const classes = useStyles();

    return (
        <TableCell >
            <FormControl className={classes.formControl}>
                <Label>{label}</Label>
                <Select
                    labelId={label}
                    id="demo-simple-select-placeholder-label"
                    displayEmpty
                    className={classes.selectEmpty}
                    {...props}
                    MenuProps={{
                        style: { zIndex: 999999 },
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                        },
                        getContentAnchorEl: null,
                    }}
                    variant="outlined"
                    error={!!error}
                >
                    <MenuItem value="" onClick={() => props.callback && props.callback('')}>
                        <em>{label}</em>
                    </MenuItem>
                    {props.options?.map((o: any) => (
                       /* (o.tooltip
                            ? (<Tooltip title={o.tooltip} arrow classes={{ tooltip: classes.customTooltip }}>
                                <MenuItem
                                    onClick={() => props.callback && props.callback(o.title)}
                                    key={o.id}
                                    value={o.title}
                                >
                                    {o.title ? o.title : o.code}
                                </MenuItem>
                            </Tooltip>)
                            :  <MenuItem
                                onClick={() => props.callback && props.callback(o.title)}
                                key={o.id}
                                value={o.title}
                            >
                                {o.title}
                            </MenuItem>)*/

                       <Item callback={props.callback}
                             option={o}
                       />

                    ))}
                </Select>
                <FormHelperText className={classes.helperText} error={!!error}>
                    {error}
                </FormHelperText>
            </FormControl>
        </TableCell>
    );
};

export default SurchargeRateConditionsSelect;

export const TooltipMessage = styled.div`
  background-color: rgba(0, 0, 0, .2);
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  position: absolute;
  top: 10px;
`
