import React, {useState} from 'react'
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
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";

type PropsType = {
    cargo_groups: CargoGroupType[],
    number_of_documents: number,
    release_type: any
}

const HiddenInfoPart:React.FC<PropsType> = ({cargo_groups, number_of_documents, release_type}) => {

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
                                <InfoRowValue>{release_type}</InfoRowValue>
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
                    <ChargesTable />
                </DocumentsContent>
            </ChargesWrapper>
        </HiddenOuter>
    )
}

export default HiddenInfoPart

