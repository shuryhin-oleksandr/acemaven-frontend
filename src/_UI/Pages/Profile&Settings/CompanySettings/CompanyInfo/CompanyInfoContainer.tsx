import React, {useState} from 'react'
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
//components
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";
import Info from './Info'
import EditCompanyInfoForm from "./EditCompanyInfoForm";
//styles
import {
    InfoBlock,
    InfoContainer,
    InfoHeader,
    InfoInner,
    InfoLabel,
    InfoText,
    LineWrap,
} from './company-info-styles'
import {useTranslation} from "react-i18next";


type PropsType = {
    company_type: string,
    current_user_role: string[],
    isFetching: boolean
}

const CompanyInfoContainer: React.FC<PropsType> = ({company_type, current_user_role, isFetching}) => {
    const [edit, setEdit] = useState(false)

    let companyInfo = useSelector((state: AppStateType) => state.profile.companyInfo)
const {t} = useTranslation();

    return (
        <>
            {isFetching
                ? <SpinnerForAuthorizedPages min_height='100%'/>
                : <InfoContainer>
                    <InfoInner>
                        <InfoHeader>
                            <InfoBlock>
                                <InfoLabel>{t("Register/Company Name")}</InfoLabel>
                                <InfoText>{companyInfo?.name ? companyInfo?.name : '-'}</InfoText>
                            </InfoBlock>
                            <InfoBlock>
                                <InfoLabel>{t("Register/Tax ID No.")}</InfoLabel>
                                <InfoText>{companyInfo?.tax_id ? companyInfo?.tax_id : '-'}</InfoText>
                            </InfoBlock>
                        </InfoHeader>
                        <LineWrap/>
                        {!edit
                            ? <Info setEdit={setEdit}
                                    companyInfo={companyInfo}
                                    company_type={company_type}
                                    current_user_role={current_user_role}

                            />
                            : <EditCompanyInfoForm companyInfo={companyInfo}
                                                   setEdit={setEdit}
                                                   company_type={company_type}
                            />
                        }
                    </InfoInner>
                </InfoContainer>
            }
        </>

    )
}

export default CompanyInfoContainer
