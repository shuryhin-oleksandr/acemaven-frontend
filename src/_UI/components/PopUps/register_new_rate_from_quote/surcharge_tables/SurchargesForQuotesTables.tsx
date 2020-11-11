import React from 'react'
//components
import HandlingTable from "./HandlingTable";
import AdditionalSurchargesPopupTable from "./AdditionalSurchargesPopupTable";

type PropsType = {
    containers?: any
}



const SurchargesForQuotesTables:React.FC<PropsType> = ({containers}) => {

    return (
        <div style={{width: '100%', paddingBottom: '40px', borderBottom: '1px solid #bdbdbd', display: 'flex', justifyContent: 'space-between', marginBottom: '40px'}}>
            <HandlingTable />
            <AdditionalSurchargesPopupTable />
        </div>
    )
}

export default SurchargesForQuotesTables