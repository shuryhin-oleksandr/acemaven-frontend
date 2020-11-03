import React from 'react'
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
import {IconButton} from "@material-ui/core";
import down_arrow from '../../../../../../_UI/assets/icons/rates&services/show_arrow.svg'
import up_arrow from '../../../../../../_UI/assets/icons/rates&services/hide_arrow.svg'
import ShippingModeTable from "./shipping_mode_table/ShippingModeTable";
import ChargesTable from "./charges_table/ChargesTable";

type PropsType = {

}

const HiddenInfoPart:React.FC<PropsType> = ({}) => {
    return (
        <HiddenOuter>
            <DocumentsWrapper>
                <DocumentsContent>
                    <GeneralTitle>DOCUMENTS</GeneralTitle>
                    <ActionsInfoWrapper >
                        <InfoBlock>
                            <InfoRow margin_right='73px'>
                                <InfoRowLabel>RELEASE TYPE</InfoRowLabel>
                                <InfoRowValue>Document release type</InfoRowValue>
                            </InfoRow>
                            <InfoRow>
                                <InfoRowLabel>NO. OF DOCUMENTS</InfoRowLabel>
                                <InfoRowValue>12</InfoRowValue>
                            </InfoRow>
                        </InfoBlock>
                        <IconButton style={{padding: '0px', height: '25px', width: '25px'}}>
                            <img src={down_arrow} alt="" style={{width: '14px'}}/>
                        </IconButton>
                    </ActionsInfoWrapper>
                </DocumentsContent>
            </DocumentsWrapper>
            <CargoWrapper>
                <DocumentsContent>
                    <GeneralTitle>CARGO</GeneralTitle>
                    <ShippingModeTable />
                    <ShippingModeTable />
                </DocumentsContent>
            </CargoWrapper>
            <ChargesWrapper>
                <DocumentsContent>
                    <GeneralTitle>CHARGES</GeneralTitle>
                    <ChargesTable />
                </DocumentsContent>
            </ChargesWrapper>
        </HiddenOuter>
    )
}

export default HiddenInfoPart

