import React from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//types
import {BillingOperationType} from "../../../../../../_BLL/types/billing/billingTypes";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
//components
import ShipmentInfo from "./blocks/ShipmentInfo";
import ChargesToPay from "./blocks/ChargesToPay";
//styles
import {
    BillingProgressContent,
    BillingProgressInner,
    BillingProgressWrapper,
    BookingNumberWrapper, BookingSpan, NumberSpan, StatusDescriptionSpan, StatusSpan
} from "../billing-in-progress-styles";
import {BillingTitle} from "../../exchange/agent-billing-styles";
//icons
import close_icon from '../../../../../assets/icons/close-icon.svg'


type PropsType = {
    billing_details: BillingOperationType | null,
    goBackHandler: VoidFunctionType,
    local_time: string
}

const BillingDetailsPage: React.FC<PropsType> = ({billing_details, goBackHandler, local_time}) => {



    return (
        <BillingProgressWrapper>
            <BillingProgressInner>
                    <IconButton style={{position: 'absolute', top: '10px', right: '30px'}}
                                onClick={goBackHandler}
                    >
                        <img src={close_icon} alt="" style={{width: '15px'}}/>
                    </IconButton>
                <BillingProgressContent>
                    <BillingTitle margin_bottom='8px'>
                        {billing_details?.aceid}
                    </BillingTitle>
                    <BookingNumberWrapper>
                        <BookingSpan>
                            BOOKING
                        </BookingSpan>
                        <NumberSpan>
                            No {billing_details?.booking_number}
                        </NumberSpan>
                    </BookingNumberWrapper>
                    <BookingNumberWrapper border_bottom='1px solid #bdbdbd'
                                          padding_bottom='27px'
                    >
                        <StatusSpan>STATUS</StatusSpan>
                        <StatusDescriptionSpan>
                            {local_time}{' '}
                        <span style={{fontFamily: 'Helvetica Reg', fontSize: '18px', textTransform: 'uppercase'}}>{billing_details?.status}</span>
                        </StatusDescriptionSpan>
                    </BookingNumberWrapper>
                    <ShipmentInfo billing_details={billing_details}/>
                    <ChargesToPay charges={billing_details?.charges ?? null}
                                  payment_due_by={billing_details?.payment_due_by ?? null}
                    />
                </BillingProgressContent>
            </BillingProgressInner>
        </BillingProgressWrapper>
    )
}

export default BillingDetailsPage