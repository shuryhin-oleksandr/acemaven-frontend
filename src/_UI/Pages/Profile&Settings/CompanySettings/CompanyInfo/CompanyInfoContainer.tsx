import React from 'react'
import {
    InfoBlock,
    InfoContainer,
    InfoHeader,
    InfoInner,
    InfoLabel,
    InfoText,
    LineWrap,
} from './company-info-styles'
import Info from './Info'
import EditCompanyInfoForm from "./EditCompanyInfoForm";
import { useState } from 'react';


const CompanyInfoContainer:React.FC = () => {
    const [edit, setEdit] = useState(false)

    return (
        <InfoContainer>
            <InfoInner>
                <InfoHeader>
                    <InfoBlock>
                        <InfoLabel>Company Name</InfoLabel>
                        <InfoText>CompanyA</InfoText>
                    </InfoBlock>
                    <InfoBlock>
                        <InfoLabel>Tax id Number</InfoLabel>
                        <InfoText>000.000./00</InfoText>
                    </InfoBlock>
                </InfoHeader>
                <LineWrap/>
                {!edit
                    ? <Info setEdit={setEdit}/>
                    : <EditCompanyInfoForm setEdit={setEdit}/>
                }
            </InfoInner>
        </InfoContainer>
    )
}

export default CompanyInfoContainer
