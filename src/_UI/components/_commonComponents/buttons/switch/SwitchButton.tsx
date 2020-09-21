import React from "react";
import Switch from '@material-ui/core/Switch';
import { makeStyles } from "@material-ui/core/styles";



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

export const CustomizedSwitch:React.FC = ({...props}) => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        checkedA: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                focusVisibleClassName={classes.focusVisible}
                classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                }}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>
    );
}