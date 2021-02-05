import React from "react";
//react-hook-form
import {Controller, useFormContext} from "react-hook-form";
//material ui
import Switch from '@material-ui/core/Switch';
import {makeStyles} from "@material-ui/core/styles";


let useStyles = makeStyles({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: '2px',
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: 'white',
            '& + $track': {
                backgroundColor: '#115B86',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#115B86',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid gray`,
        backgroundColor: 'white',
        opacity: 1,
        transition: '.2s',
    },
    checked: {},
    focusVisible: {},
})

export const CustomizedSwitch: React.FC<{
    switch_name: string,
    submitThunk: (value: any) => void
}> = ({switch_name, submitThunk}) => {

    const classes = useStyles()

    const {control} = useFormContext()



    return (
        <Controller
            control={control}
            name={switch_name}
            defaultValue={false}
            render={(
                {onChange, value, ref}
            ) =>
                <Switch
                    onChange={(e) => {
                        onChange(e.target.checked);
                        submitThunk({[`${switch_name}`]: e.target.checked})
                    }}
                    checked={value}
                    inputRef={ref}
                    focusVisibleClassName={classes.focusVisible}
                    classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
            }
        />

    );
}