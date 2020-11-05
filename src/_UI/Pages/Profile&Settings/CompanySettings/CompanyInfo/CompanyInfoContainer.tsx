import React, { useEffect } from 'react'
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
import {useDispatch, useSelector} from "react-redux";
import {getCompanyInfo} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";

type PropsType = {
    company_type: string
}

const CompanyInfoContainer:React.FC<PropsType> = ({company_type}) => {
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const companyId = sessionStorage.getItem('u')
    let companyInfo = useSelector((state: AppStateType) => state.profile.companyInfo)

    useEffect(() => {
        dispatch(getCompanyInfo(Number(companyId)))
    }, [dispatch])


    return (
        <InfoContainer>
            <InfoInner>
                <InfoHeader>
                    <InfoBlock>
                        <InfoLabel>Company Name</InfoLabel>
                        <InfoText>{companyInfo?.name}</InfoText>
                    </InfoBlock>
                    <InfoBlock>
                        <InfoLabel>Tax id Number</InfoLabel>
                        <InfoText>{companyInfo?.tax_id}</InfoText>
                    </InfoBlock>
                </InfoHeader>
                <LineWrap/>
                {!edit
                    ? <Info setEdit={setEdit} companyInfo={companyInfo} company_type={company_type}/>
                    : <EditCompanyInfoForm companyInfo={companyInfo} setEdit={setEdit} company_type={company_type}/>
                }
            </InfoInner>
        </InfoContainer>
    )
}

export default CompanyInfoContainer
