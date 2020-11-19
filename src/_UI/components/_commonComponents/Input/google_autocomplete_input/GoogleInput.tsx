import React, {useState} from 'react'
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



type PropsType = {
    register: any,
    google_field_name: string,
    errors: any,
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

const GoogleInput:React.FC<PropsType> = ({register, google_field_name,errors}) => {

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

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <GoogleInputOuter>
                        <LabelGoogleInput>Address</LabelGoogleInput>
                        <GoogleInputWrapper error={errors?.google_field_name?.message}>
                            <input
                                {...getInputProps({
                                    placeholder: 'Placeholder',
                                    className: 'location-search-input'
                                })}
                                name={google_field_name}
                                ref={register({
                                    required: 'Field is required'
                                })
                                }

                            />
                            <Tooltip title='You can use automatic address search'
                                     arrow
                                     classes={{ tooltip: classes.customTooltip }}
                            >
                                <img src={location_icon} alt=""/>
                            </Tooltip>
                        </GoogleInputWrapper>
                        {errors?.google_field_name && <HelperText>Field is required</HelperText>}
                    </GoogleInputOuter>
                    <div style={{marginTop: '-15px'}}>
                        {loading && <div>Loading...</div>}
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
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default GoogleInput