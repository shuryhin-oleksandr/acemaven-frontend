import React, {useState} from 'react'
import MenuItem from "@material-ui/core/MenuItem";
import {TooltipMessage} from "./SurchargeRateConditionsSelect";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

type PropsType = {
    callback: any
    option: {id: number, title: string, tooltip: string}
}

const Item:React.FC<PropsType> = ({callback, option}) => {
    const classes = useStyles();
    const [isTooltipShown, showTooltip] = useState(false)
    const setTooltip = (value: boolean) => {
        showTooltip(value)
    }

    return (
        <MenuItem
            onClick={() => callback && callback(option.title)}
            key={option.id}
            value={option.title}
            className={classes.menu_item}
        >
            <span onMouseEnter={() => setTooltip(true)} >{option.title}</span>
            {isTooltipShown && <TooltipMessage>{option.tooltip}</TooltipMessage>}
        </MenuItem>
    )
}

export default Item