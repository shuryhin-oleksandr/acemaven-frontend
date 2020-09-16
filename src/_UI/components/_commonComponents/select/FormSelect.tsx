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
    name?: string,
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        marginBottom: '20px'
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


const FormSelect:React.FC<IProps> = ({ label, error, name, ...props}) => {
    const [isFocus, setFocus] = useState(false)
    const classes = useStyles();

    const [value, setValue] = useState('')
    const handleChange = (event:any) => {
        setValue(event.target.value);
    };

    return(
        <SelectContainer>
            <FormControl className={classes.formControl}>
                <Label isFocus={isFocus}>{label}</Label>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    name={name}
                >
                    <MenuItem value="">
                        <em>{label}</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </SelectContainer>
    )
}

export default FormSelect