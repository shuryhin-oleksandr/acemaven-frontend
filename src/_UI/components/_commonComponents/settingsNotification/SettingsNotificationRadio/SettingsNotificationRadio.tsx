import React from "react";
import {ActionsWrapRadio, CommonWrap, Outer, RadioLabel} from "../settings-notification-styles";
import {
    LineWrap,
    SettingsSubtitle,
    SettingsTitle
} from "../../../../Pages/Profile&Settings/GeneralSettings/general-settings-styles";
import Radio from '@material-ui/core/Radio';
import { makeStyles } from "@material-ui/core/styles";


type PropsType = {
    title?: string,
    subtitle?: string,
    name?: string
}
let useStyles = makeStyles ({
    root: {
        color: '#1B1B25',
        padding: '0',
        marginBottom: '10px',

        '&.Mui-checked': {
            color: '#1B1B25',
        },
    },

})


const SettingsNotificationRadio:React.FC<PropsType> = ({title, subtitle, name}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    const [selectedValue, setSelectedValue] = React.useState('yes');
    const classes = useStyles()

    return (
       <Outer>
           <SettingsTitle>{title}</SettingsTitle>
           <SettingsSubtitle>{subtitle}</SettingsSubtitle>
           <ActionsWrapRadio>
               <CommonWrap>
                   <Radio
                       checked={selectedValue === 'yes'}
                       onChange={handleChange}
                       value="b"
                       name="radio-button-demo"
                       inputProps={{ 'aria-label': 'Yes' }}
                       className={classes.root}
                       size='small'
                   />
                   <RadioLabel>Yes</RadioLabel>
               </CommonWrap>
               <CommonWrap>
                   <Radio
                       checked={selectedValue === 'no'}
                       onChange={handleChange}
                       value="b"
                       name="radio-button-demo"
                       inputProps={{ 'aria-label': 'No' }}
                       className={classes.root}
                       size='small'
                   />
                   <RadioLabel>No</RadioLabel>
               </CommonWrap>
           </ActionsWrapRadio>
           <LineWrap/>
       </Outer>
    )
}

export default SettingsNotificationRadio