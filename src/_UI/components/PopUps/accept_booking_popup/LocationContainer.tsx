import React from 'react'
import LocationBlock from "./LocationBlock";

type PropsType = {
    register: any,
    errors: any,
    direction: string,
    shipping_mode: string
}

const LocationContainer:React.FC<PropsType> = ({ register, errors, direction, shipping_mode}) => {
    return (
        <>
            {direction === 'export'
                ? <>
                    {shipping_mode === 'FCL'
                    && <LocationBlock register={register}
                                      errors={errors}
                                      label={'Empty Pick Up Location'}
                                      field_name={'empty_pickup_location'}
                                      google_field_name={'empty_pickup_location_address'}
                    />
                    }
                    <LocationBlock register={register}
                                   errors={errors}
                                   label={'Cargo Drop Off Location'}
                                   field_name={'cargo_drop_off_location'}
                                   google_field_name={'cargo_drop_off_location_address'}
                    />
                </>
                : <LocationBlock register={register}
                                 errors={errors}
                                 label={'Cargo Pick Up Location'}
                                 field_name={'cargo_pick_up_location'}
                                 google_field_name={'cargo_pick_up_location_address'}
                />
            }
        </>

    )
}

export default LocationContainer