import React, {useEffect, useState} from 'react'
//material ui
import {Tooltip} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
//react places autocomplete
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
//styles
import {GoogleInputOuter, GoogleInputWrapper, LabelGoogleInput} from "./google-input-styles";
import {HelperText} from "../input-styles";
//icons
import location_icon  from '../../../../../_UI/assets/icons/booking/location_icon.svg';
import {useTranslation} from "react-i18next";
import {Scrollbars} from "react-custom-scrollbars";
import {Port, PortsList} from "../../../../Pages/Services&Rates/surcharge/register_new_surcharge/form-styles";
import {PortType} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";



type PropsType = {
    register: any,
    google_field_name: string,
    errors: any,
    google_label: boolean | undefined,
    color_label?: string,
    font_weight?: string,
    label_uppercase?: boolean,
    defaultValue?: string,
    disabled: boolean
}

const useStyles = makeStyles({
    customTooltip: {
        maxWidth: 330,
        height: 60,
        fontFamily: 'Helvetica Reg',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px'
    },
});

const GoogleInput:React.FC<PropsType> = ({register, google_field_name, errors, google_label, ...props}) => {

    const classes = useStyles();

    const [address, setAddress] = useState('')

    const handleChange = (address: any) => {
        setAddress(address)
    };

    const handleSelect = (address: any) => {
        geocodeByAddress(address)
            .then(results => setAddress(results && results[0].formatted_address))
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    useEffect(() => {
        if(props.defaultValue) {
            handleChange(props.defaultValue)
        }
    }, [props.defaultValue])
    const {t} = useTranslation();
    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <GoogleInputOuter>
                        {google_label && <LabelGoogleInput color_label={props.color_label}
                                                           label_uppercase={props.label_uppercase}
                                                           font_weight={props.font_weight}
                        >
                            {t("Booking Confirmation/Address")}
                        </LabelGoogleInput>
                        }
                        <GoogleInputWrapper error={errors?.google_field_name?.message}>
                            <input
                                {...getInputProps({
                                    placeholder: 'Placeholder',
                                    className: 'location-search-input',
                                    disabled: props.disabled
                                })}
                                name={google_field_name}
                                ref={register({
                                    required: `${t("Error message/Field is required")}`
                                })
                                }
                                style={{backgroundColor: props.disabled ? "#ECECEC" : 'white'}}
                            />
                            <Tooltip title={`${t('Freight rates/You can use automatic address search')}`}
                                     arrow
                                     classes={{ tooltip: classes.customTooltip }}
                            >
                                <img src={location_icon} alt=""/>
                            </Tooltip>
                        </GoogleInputWrapper>
                        {errors?.google_field_name && <HelperText>{t("Error message/Field is required")}</HelperText>}
                    </GoogleInputOuter>
                    <div style={{marginTop: '-15px', position: 'relative'}}>
                        {/*{loading && <div>{t("Booking Confirmation/Loading...")}</div>}*/}
                        {suggestions?.length > 0 &&
                        <Scrollbars
                          style={{
                              position: "absolute",
                              zIndex: 10,
                              borderRadius: 5,
                              border: "1px solid rgba(0,0,0,0.5)",
                          }}
                          autoHeight={true}
                          autoHeightMax={160}
                        >
                            <PortsList>
                        {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer'  }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                    key={index}
                                >
                                    <Port>
                                        {suggestion.description}
                                    </Port>
                                </div>
                            );
                        })}
                            </PortsList>
                        </Scrollbars> }
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default GoogleInput