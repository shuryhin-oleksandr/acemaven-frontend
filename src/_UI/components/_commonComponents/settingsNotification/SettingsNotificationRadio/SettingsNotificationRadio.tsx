import React from "react";
//react-hook-form
import {Controller, useFormContext} from "react-hook-form";
//material ui
import {RadioGroup} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import {makeStyles} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
//styles
import {ActionsWrapRadio, CommonWrap, Outer, RadioLabel} from "../settings-notification-styles";
import {
    LineWrap,
    SettingsSubtitle,
    SettingsTitle
} from "../../../../Pages/Profile&Settings/GeneralSettings/general-settings-styles";
import {useTranslation} from "react-i18next";


let useStyles = makeStyles({
    '&.MuiFormGroup-root': {
        maxWidth: '40px'
    },
    root: {
        color: '#575757',
        padding: '5px',
        '&$checked': {
            color: grey[600],
        },

        '&.Mui-checked': {
            color: '#575757',
        },

    },
    form_control_label: {
        marginLeft: '0'
    }
})


type PropsType = {
    title?: string,
    subtitle?: string,
    name: string,
    submitThunk: (value: any) => void
}


const SettingsNotificationRadio: React.FC<PropsType> = ({title, subtitle, name, submitThunk}) => {

    const classes = useStyles()

    const {control} = useFormContext()

    const {t} = useTranslation();
    return (
        <Outer>
            <SettingsTitle>{title}</SettingsTitle>
            <SettingsSubtitle>{subtitle}</SettingsSubtitle>
            <ActionsWrapRadio>
                <Controller
                    name={name}
                    control={control}
                    render={({onChange, value}) =>
                        <RadioGroup value={value}
                                    onChange={(event) => {
                                        onChange(event.currentTarget.value);
                                        submitThunk({[`${name}`]: event.currentTarget.value === 'yes'})
                                    }}
                        >
                            <CommonWrap>
                                <Radio className={classes.root}
                                       value='yes'
                                       color="default"
                                       size='small'
                                />
                                <RadioLabel>{t("Email notifications/YES")}</RadioLabel>
                            </CommonWrap>
                            <CommonWrap>
                                <Radio className={classes.root}
                                       value='no'
                                       color="default"
                                       size='small'
                                />
                                <RadioLabel>{t("Email notifications/NO")}</RadioLabel>
                            </CommonWrap>
                        </RadioGroup>
                    }
                    defaultValue='yes'
                />
            </ActionsWrapRadio>
            <LineWrap/>
        </Outer>
    )
}

export default SettingsNotificationRadio