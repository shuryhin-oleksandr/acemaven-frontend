import React from 'react'
import { GeneralTitle } from 'src/_UI/Pages/quotes/agent/table/agent-quotes-styles';
import Cargos from './cargos/Cargos';
import {
    ChangedInfoBlockWrapper,
    InfoBlockContent,
    InfoBlockInner,
    InfoBlockLabel,
    InfoBlockOuter, InfoBlockValue, ValuesWrapper
} from "./change-request-agent-styles";
import {OperationType} from "../../../../_BLL/types/operations/operationsTypes";


type PropsType = {
    operation_info: OperationType | null
}

const ChangedInfoBlock:React.FC<PropsType> = ({operation_info}) => {

    let initial_date = {start: operation_info?.date_from, to: operation_info?.date_to}
    let changed_date = {
        start: operation_info?.change_request && operation_info?.change_request[0].date_from,
        to: operation_info?.change_request && operation_info?.change_request[0].date_to
    }

    console.log(initial_date === changed_date)


    return (
        <ChangedInfoBlockWrapper>
            {operation_info?.number_of_documents &&
            <InfoBlockOuter>
                <GeneralTitle>DOCUMENTS</GeneralTitle>
                <InfoBlockInner>
                    <InfoBlockContent>
                        <ValuesWrapper>
                            <InfoBlockLabel>Release type</InfoBlockLabel>
                            <InfoBlockValue>Document release type</InfoBlockValue>
                        </ValuesWrapper>
                        <ValuesWrapper>
                            <InfoBlockLabel>Number of documents</InfoBlockLabel>
                            <InfoBlockValue>12</InfoBlockValue>
                        </ValuesWrapper>
                        <div style={{
                            fontFamily: 'Helvetica Bold',
                            fontSize: '16px',
                            color: '#1B1B25',
                            display: 'flex',
                            alignItems: 'flex-end',
                            margin: ' 0 40px '
                        }}>
                            to
                        </div>
                        <ValuesWrapper back_color='rgba(17, 91, 134, .05)'>
                            <InfoBlockLabel font_color='#115B86'>Release type</InfoBlockLabel>
                            <InfoBlockValue font_color='#115B86'>Document release type</InfoBlockValue>
                        </ValuesWrapper>
                        <ValuesWrapper back_color='rgba(17, 91, 134, .05)'>
                            <InfoBlockLabel font_color='#115B86'>Number of documents</InfoBlockLabel>
                            <InfoBlockValue font_color='#115B86'>12</InfoBlockValue>
                        </ValuesWrapper>
                    </InfoBlockContent>
                </InfoBlockInner>
            </InfoBlockOuter>
            }
            <InfoBlockOuter>
                <GeneralTitle>DATES</GeneralTitle>
                <InfoBlockInner>
                    <InfoBlockContent>
                        <ValuesWrapper>
                            <InfoBlockLabel>SHIPMENT DATE</InfoBlockLabel>
                            <InfoBlockValue>01/11-07/11</InfoBlockValue>
                            <InfoBlockValue font_size='24px'>WEEK 47</InfoBlockValue>
                        </ValuesWrapper>
                        <div style={{fontFamily: 'Helvetica Bold', fontSize: '16px', color: '#1B1B25', display: 'flex', alignItems: 'center', margin: ' 0 40px '}}>
                            to
                        </div>
                        <ValuesWrapper back_color='rgba(17, 91, 134, .05)'>
                            <InfoBlockLabel font_color='#115B86'>SHIPMENT DATE</InfoBlockLabel>
                            <InfoBlockValue font_color='#115B86'>07/11-14/11</InfoBlockValue>
                            <InfoBlockValue font_color='#115B86' font_size='24px'>WEEK 48</InfoBlockValue>
                        </ValuesWrapper>
                    </InfoBlockContent>
                </InfoBlockInner>
            </InfoBlockOuter>
            <Cargos />
        </ChangedInfoBlockWrapper>
    )
}

export default ChangedInfoBlock
