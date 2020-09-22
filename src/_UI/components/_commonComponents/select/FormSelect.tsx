import React, {useState} from 'react'
import {SelectContainer} from './select-styles'
import {Label} from "../Input/input-styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";


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
            height: '40px',
            color: '#828282',
            fontSize: '14px',
            fontFamily: 'Helvetica Light',
            fontStyle: 'normal',
            transition: '.3',

            '& .MuiSelect-icon': {
                color: 'rgba(0, 0, 0, 0.23)'
            },

            '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderWidth: '1px'
            },

            '&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                transition: '.3s',
                borderColor: '#7C7C89',
                background: '#ECECEC',
                'z-index': -1
            },

            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)'
            },

            '& .MuiSelect-select': {
                paddingLeft: '10px',
                '&:focus': {
                    background: 'none'
                }
            }
        },
        helperText: {
            textAlign: 'right',
            fontWeight: 500,
            fontFamily: "Helvetica Reg, sans-serif",

            '&.Mui-error': {
                color: 'red'
            }
        }
    }
));


const FormSelect: React.FC<IProps> = ({label, error, ...props}) => {
    const [isFocus, setFocus] = useState(false)
    const classes = useStyles();

    return (
        <SelectContainer>
            <FormControl className={classes.formControl}>
                <Label isFocus={isFocus}>{label}</Label>
                <Select
                    labelId={label}
                    id="demo-simple-select-placeholder-label"
                    displayEmpty
                    className={classes.selectEmpty}
                    onFocus={() => setFocus(true)}
                    {...props}
                    MenuProps={{
                        style: {zIndex: 999999},
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}
                    variant='outlined'
                    error={!!error}
                >
                    <MenuItem value="">
                        <em>{label}</em>
                    </MenuItem>
                    {
                        props.options.map((o: any) => <MenuItem key={o.name} value={o.name}>{o.name}</MenuItem>)
                    }
                </Select>
                <FormHelperText className={classes.helperText} error={!!error}>{error}</FormHelperText>
            </FormControl>
        </SelectContainer>
    )
}

export default FormSelect