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



type PropsType = {
    cargo_groups: CargoGroupQuoteType[],
    number_of_documents: number,
    release_type: any,
    charges_cost: CostBookingType | null
}

const HiddenInfoPart:React.FC<PropsType> = ({cargo_groups, number_of_documents, release_type, charges_cost}) => {

    const [isHiddenDocs, setHiddenDocs] = useState(false)

    return (
        <HiddenOuter>
            { release_type &&  <DocumentsWrapper>
                <DocumentsContent>
                    <IconButton style={{padding: '0px', height: '35px', width: '35px', position: 'absolute', right: '20px'}}
                                onClick={() => isHiddenDocs ? setHiddenDocs(false) :  setHiddenDocs(true)}
                    >
                        <img src={isHiddenDocs ? down_arrow : up_arrow} alt="" style={{width: '14px'}}/>
                    </IconButton>
                    <GeneralTitle>DOCUMENTS</GeneralTitle>
                    <ActionsInfoWrapper >
                        {!isHiddenDocs && <InfoBlock>
                            <InfoRow margin_right='73px'>
                                <InfoRowLabel>RELEASE TYPE</InfoRowLabel>
                                <InfoRowValue>{release_type.title}</InfoRowValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoRowLabel>NO. OF DOCUMENTS</InfoRowLabel>
                                <InfoRowValue>{number_of_documents}</InfoRowValue>
                            </InfoRow>
                        </InfoBlock>}
                    </ActionsInfoWrapper>
                </DocumentsContent>
            </DocumentsWrapper>}
            <CargoWrapper>
                <DocumentsContent>
                    <GeneralTitle>CARGO</GeneralTitle>
                    <ShippingModeTable cargo_groups={cargo_groups}/>
                </DocumentsContent>
            </CargoWrapper>
            <ChargesWrapper>
                <DocumentsContent>
                    <GeneralTitle>CHARGES</GeneralTitle>
                    <ChargesTable charges_cost={charges_cost ? charges_cost : null}/>
                </DocumentsContent>
            </ChargesWrapper>
        </HiddenOuter>
    )
}

export default HiddenInfoPart

