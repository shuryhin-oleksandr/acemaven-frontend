import React from 'react'
//components
import HandlingTable from "./HandlingTable";
import AdditionalSurchargesPopupTable from "./AdditionalSurchargesPopupTable";
import {AdditionalSurchargeType, ContainerType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
    containers: ContainerType[],
    additional:  AdditionalSurchargeType[],
    additionalTableName: string,
    additional_type: string,
    quote_shipping_mode_id: number,
    control: any,
    register: any,
    setValue: any
}


const SurchargesForQuotesTables:React.FC<PropsType> = ({containers, ...props}) => {

    return (
        <div style={{width: '100%', paddingBottom: '40px', borderBottom: '1px solid #bdbdbd', display: 'flex', marginBottom: '40px'}}>
            {containers.length > 0 && <HandlingTable containers={containers}
                           package_type={props.additional_type}
                           table_name={props.additionalTableName}
                           control={props.control}
                           register={props.register}
            />}
            <AdditionalSurchargesPopupTable charges={props.additional}
                                            quote_shipping_mode_id={props.quote_shipping_mode_id}
                                            control={props.control}
                                            register={props.register}
                                            setValue={props.setValue}
            />
        </div>
    )
}

export default SurchargesForQuotesTables