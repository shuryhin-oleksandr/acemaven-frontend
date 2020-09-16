import React, {forwardRef, useState} from 'react';
import { InputOuter } from './input-styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import makeStyles from "@material-ui/core/styles/makeStyles";

type PropsType = {
    placeholder?: string,
    name?: string,
    value?: string,
    onChange?: VoidFunctionType,
    inputRef?: React.Ref<HTMLInputElement>,
    error?: string
    label?: string
}
 const useStyles = makeStyles({
    input: {
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7C7C89',
            transition: '.2s'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7C7C89',
            transition: '.2s',
            borderWidth: '1px'

        },
        '& .MuiInputBase-input': {
            height: '40px',
            width: '100%',
            border: '1px solid #BDBDBD',
            borderRadius: '4px',
            padding: '0px 0 0 10px',
            transition: '.2s',

        }
    },
    root: {
        color: '#1B1B25',
        fontSize: '14px',
        fontFamily: 'Helvetica Reg',
        lineHeight: '17px',
        fontWeight: 900,
        marginBottom: '9px'
    }
})

const Input:React.FC<PropsType> = forwardRef(({error, label, ...props}, inputRef) => {
    const classes = useStyles()
    const [isFocus, setFocus] = useState(false)

    return (
        <InputOuter>
            {isFocus && <InputLabel className={classes.root}>{label}</InputLabel>}
            <TextField onFocus={() => setFocus(true)}
                       onBlur={() => setFocus(false)}
                       className={classes.input}
                       variant='outlined' {...props}
                       inputRef={inputRef}/>
            <FormHelperText error={!!error}>{error}</FormHelperText>
        </InputOuter>
    )
})

export default Input