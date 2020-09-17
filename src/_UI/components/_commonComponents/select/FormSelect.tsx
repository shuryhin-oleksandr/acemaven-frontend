import React, {useState} from 'react'
import { SelectContainer } from './select-styles'
import {Label} from "../Input/input-styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';


type IProps = {
    label?: string,
    error?: string,
    options?: any,
    placeholder?: string
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        marginBottom: '15px'
    },
    selectEmpty: {
        width: '100%',
        border: '1px solid #BDBDBD',
        borderBottom: 'none',
        height: '40px',
        borderRadius: '4px',
        color: '#828282',
        fontSize: '14px',
        fontFamily: 'Helvetica Light',
        fontStyle: 'normal',
        padding: '10px'
    },
}));


const FormSelect:React.FC<IProps> = ({ label, error, ...props}) => {
    const [isFocus, setFocus] = useState(false)
    const classes = useStyles();

    return(
        <SelectContainer>
            <FormControl className={classes.formControl}>
                <Label isFocus={isFocus}>{label}</Label>
                <Select
                    labelId={label}
                    id="demo-simple-select-placeholder-label"
                    displayEmpty
                    className={classes.selectEmpty}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                >
                    <MenuItem value="">
                        <em>{label}</em>
                    </MenuItem>
                    {props.options.map((o:any) => <MenuItem key={o.name} value={o.name}>{o.name}</MenuItem>)}
                </Select>
            </FormControl>
        </SelectContainer>
    )
}

export default FormSelect