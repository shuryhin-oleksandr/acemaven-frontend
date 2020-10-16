import React from "react";
import {CardButton, CardInner, CardTitle, SurchargeCardWrapper} from "./form-styles";


const NoSurchargeCard:React.FC = () => {
    return(
        <SurchargeCardWrapper>
            <CardInner>
                <CardTitle>There are no surcharges. <br/>
                    The rate won’t be posted until a matching surcharge agreement is created</CardTitle>
                <CardButton>Register new surcharges</CardButton>
            </CardInner>
        </SurchargeCardWrapper>
    )
}

export default NoSurchargeCard