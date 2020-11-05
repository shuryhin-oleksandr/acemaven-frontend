import React from "react";
import { SelectContainer } from "./select-styles";
import { Label } from "../Input/input-styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { VoidFunctionType } from "src/_BLL/types/commonTypes";

type IProps = {
  label?: string;
  error?: string;
  options?: any;
  placeholder?: string;
  callback?: VoidFunctionType;
  maxW?: string;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginBottom: "15px",
  },
  selectEmpty: {
    width: "100%",
    height: "40px",
    color: "#828282",
    fontSize: "14px",
    fontFamily: "Helvetica Light",
    fontStyle: "normal",
    transition: ".3",

    "&.Mui-error": {
      border: "1px solid rgba(0, 0, 0, .5)",
      backgroundColor: "rgba(0, 0, 0, .07)",
    },

    "& .MuiSelect-icon": {
      color: "rgba(0, 0, 0, 0.23)",
    },

    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
      borderWidth: "1px",
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
      color: "#e76767",
    },
  },
}));

const FormSelect: React.FC<IProps> = ({ label, error, ...props }) => {
  const classes = useStyles();

  return (
    <SelectContainer maxW={props.maxW}>
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
          <MenuItem value="">
            <em>{label}</em>
          </MenuItem>
          {props.options?.map((o: any) => (
            <MenuItem
              onClick={() => props.callback && props.callback(o.value)}
              key={o.name ? o.name : o.id}
              value={o.value ? o.value : o.id}
            >
              {o.name ? o.name : (o.title ? o.title : (o.description ? o.description : o.code))}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText className={classes.helperText} error={!!error}>
          {error}
        </FormHelperText>
      </FormControl>
    </SelectContainer>
  );
};

export default FormSelect;
