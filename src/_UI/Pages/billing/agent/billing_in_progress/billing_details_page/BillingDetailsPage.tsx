import React from 'react'
import {
    BillingProgressContent,
    BillingProgressInner,
    BillingProgressWrapper,
    BookingNumberWrapper, BookingSpan, NumberSpan, StatusDescriptionSpan, StatusSpan
} from "../billing-in-progress-styles";
import {BillingTitle} from "../../exchange/agent-billing-styles";
import ShipmentInfo from "./blocks/ShipmentInfo";
import ChargesToPay from "./blocks/ChargesToPay";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../../../assets/icons/close-icon.svg'
import { useHistory } from 'react-router-dom';

type PropsType = {}

const BillingDetailsPage: React.FC<PropsType> = ({}) => {

    const history = useHistory()

    return (
        <BillingProgressWrapper>
            <BillingProgressInner>
                    <IconButton style={{position: 'absolute', top: '10px', right: '30px'}}
                                onClick={() => history.push('/billing_in_progress')}
                    >
                        <img src={close_icon} alt="" style={{width: '15px'}}/>
                    </IconButton>
                <BillingProgressContent>
                    <BillingTitle margin_bottom='8px'>0095VSL40</BillingTitle>
                    <BookingNumberWrapper>
                        <BookingSpan>
                            BOOKING
                        </BookingSpan>
                        <NumberSpan>
                            No ACY849385789
                        </NumberSpan>
                    </BookingNumberWrapper>
                    <BookingNumberWrapper border_bottom='1px solid #bdbdbd'
                                          padding_bottom='27px'
                    >
                        <StatusSpan>STATUS</StatusSpan>
                        <StatusDescriptionSpan>05/11 21:00 BOOKING IS CONFIRMED LA LA LA LA </StatusDescriptionSpan>
                    </BookingNumberWrapper>
                    <ShipmentInfo />
                    <ChargesToPay />
                </BillingProgressContent>
            </BillingProgressInner>
        </BillingProgressWrapper>
    )
}

export default BillingDetailsPage