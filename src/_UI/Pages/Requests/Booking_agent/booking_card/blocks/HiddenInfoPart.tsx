import React, {useState} from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//types
import {CargoGroupQuoteType} from "../../../../../../_BLL/types/quotes/quotesTypes";
import {CostBookingType} from "../../../../../../_BLL/types/bookingTypes";
//components
import ShippingModeTable from "./shipping_mode_table/ShippingModeTable";
import ChargesTable from "./charges_table/ChargesTable";
//styles
import {
    ActionsInfoWrapper,
    CargoWrapper, ChargesWrapper,
    DocumentsContent,
    DocumentsWrapper,
    HiddenOuter,
    InfoBlock,
} from "./hidden-part-styles";
import {GeneralTitle} from "../../../../quotes/agent/table/agent-quotes-styles";
import {InfoRow, InfoRowLabel, InfoRowValue} from "../booking-card-style";
//icons
import down_arrow from '../../../../../../_UI/assets/icons/rates&services/show_arrow.svg'
import up_arrow from '../../../../../../_UI/assets/icons/rates&services/hide_arrow.svg'
import {useTranslation} from "react-i18next";



type PropsType = {
    cargo_groups: CargoGroupQuoteType[],
    number_of_documents: number,
    release_type: any,
    charges_cost: CostBookingType | null,
    booking_shipping_mode: {id: number, title: string},
    charges_today_exchange:
        | {
        total_today: number;
        "EUR exchange rate"?: number;
        "USD exchange rate"?: number;
    }
        | null
        | undefined;

}

const HiddenInfoPart:React.FC<PropsType> = ({cargo_groups, number_of_documents, release_type, charges_cost, booking_shipping_mode,charges_today_exchange}) => {

    const [isHiddenDocs, setHiddenDocs] = useState(false)
    const {t} = useTranslation();
    return (
        <HiddenOuter>
            { release_type &&  <DocumentsWrapper>
                <DocumentsContent>
                    <IconButton style={{padding: '0px', height: '35px', width: '35px', position: 'absolute', right: '20px'}}
                                onClick={() => isHiddenDocs ? setHiddenDocs(false) :  setHiddenDocs(true)}
                    >
                        <img src={isHiddenDocs ? down_arrow : up_arrow} alt="" style={{width: '14px'}}/>
                    </IconButton>
                    <GeneralTitle>{t("Bookings/DOCUMENTS")}</GeneralTitle>
                    <ActionsInfoWrapper >
                        {!isHiddenDocs && <InfoBlock>
                            <InfoRow margin_right='80px'>
                                <InfoRowLabel>{t("Bookings/RELEASE TYPE")}</InfoRowLabel>
                                <InfoRowValue>{release_type.title}</InfoRowValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoRowLabel>{t("Bookings/NO.OF DOCUMENTS")}</InfoRowLabel>
                                <InfoRowValue>{number_of_documents}</InfoRowValue>
                            </InfoRow>
                        </InfoBlock>}
                    </ActionsInfoWrapper>
                </DocumentsContent>
            </DocumentsWrapper>}
            <CargoWrapper>
                <DocumentsContent>
                    <GeneralTitle>{t("Bookings/CARGO")}</GeneralTitle>
                    <ShippingModeTable cargo_groups={cargo_groups}
                                       booking_shipping_mode={booking_shipping_mode}
                    />
                </DocumentsContent>
            </CargoWrapper>
            <ChargesWrapper>
                <DocumentsContent>
                    <GeneralTitle>{t("Bookings/CHARGES")}</GeneralTitle>
                    <ChargesTable charges_cost={charges_cost ? charges_cost : null}
                                  charges_today_exchange={charges_today_exchange}
                    />
                </DocumentsContent>
            </ChargesWrapper>
        </HiddenOuter>
    )
}

export default HiddenInfoPart

