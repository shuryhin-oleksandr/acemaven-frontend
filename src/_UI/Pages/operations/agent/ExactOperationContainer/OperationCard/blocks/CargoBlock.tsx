import React, {useState} from "react";
//material ui
import {IconButton} from "@material-ui/core";
//types
import {CargoGroupQuoteType} from "../../../../../../../_BLL/types/quotes/quotesTypes";
import {ShippingTypesEnum} from "../../../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {AppOperationBookingStatusesType} from "../../../../../../../_BLL/types/operations/operationsTypes";
//components
import CargoGroupsTable from "./Tables/CargoGroupsTable";
//styles
import {SectionTitle, SectionWrapper} from "../operation-card-style";
import {
    InfoRowLabel
} from "../../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import down_arrow from "../../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../../assets/icons/rates&services/hide_arrow.svg";


type PropsType = {
    operation_shipping_type: string,
    operation_cargo_groups: CargoGroupQuoteType[],
    operation_shipping_mode: { id: number, title: string },
    free_time?: number,
    status: string
}

const CargoBlock: React.FC<PropsType> = ({operation_shipping_type, operation_cargo_groups, operation_shipping_mode, free_time, status}) => {
    const [isHidden, setHidden] = useState(false);


    return (
        <SectionWrapper style={{position: "relative"}}>

            <IconButton style={{padding: "0px", height: "35px", width: "35px", position: "absolute", right: "20px"}}
                        onClick={() => (isHidden ? setHidden(false) : setHidden(true))}>
                <img src={isHidden ? down_arrow : up_arrow} alt="" style={{width: "14px"}}/>
            </IconButton>
            <div>
                <SectionTitle>CARGO</SectionTitle>
                {!isHidden && (
                    <>
                        {operation_shipping_type === ShippingTypesEnum.SEA
                        &&
                        (status === AppOperationBookingStatusesType.CONFIRMED ||
                            status === AppOperationBookingStatusesType.CHANGE_REQUEST ||
                            status === AppOperationBookingStatusesType.CONFIRMED_CHANGE_REQUEST
                        )
                        && free_time
                        &&
                        <div style={{display: "flex", marginBottom: '20px'}}>
                            <InfoRowLabel style={{marginRight: '5px'}}>
                                CONTAINER FREE TIME:
                                <span style={{fontFamily: 'Helvetica Light', color: '#000000', marginLeft:8}}>
                        {free_time}{' '}{free_time === 1 ? 'day' : 'days'}</span>
                            </InfoRowLabel>
                        </div>
                        }
                        <CargoGroupsTable cargo_groups={operation_cargo_groups}
                                          object_shipping_mode={operation_shipping_mode}
                        />
                    </>
                )}
            </div>
        </SectionWrapper>
    );
};

export default CargoBlock;
