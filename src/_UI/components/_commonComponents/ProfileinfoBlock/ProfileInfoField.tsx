import React from 'react'
import {FieldWrap, Info, Label, Outer, SpanName, TextWrap, Wrapper} from './profile-info-field-styles'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import {useTranslation} from "react-i18next";

type PropsType = {
}

const ProfileInfoField:React.FC<PropsType> = () => {

    const profileInfo = useSelector((state: AppStateType) => state.profile.authUserInfo)
    const {t} = useTranslation();
    return (
        <Outer>
            <Info>
                <Wrapper>
                    <FieldWrap>
                        <Label>{t("Register/Name")}</Label>
                        <TextWrap style={{textTransform: 'capitalize'}}>{profileInfo?.first_name}</TextWrap>
                    </FieldWrap>
                    <FieldWrap>
                        <Label>{t("Register/Last Name")}</Label>
                        <TextWrap style={{textTransform: 'capitalize'}}>{profileInfo?.last_name}</TextWrap>
                    </FieldWrap>
                    <FieldWrap>
                        <Label>{t("Register/Position in the Company")}</Label>
                        <TextWrap>{profileInfo?.position}</TextWrap>
                    </FieldWrap>
                </Wrapper>
               <Wrapper>
                   <FieldWrap>
                       <Label>{t("Register/Phone Number")}</Label>
                       <TextWrap>{profileInfo?.phone}</TextWrap>
                   </FieldWrap>
                   <FieldWrap>
                       <Label>{t("Register/Email")}</Label>
                       <TextWrap>{profileInfo?.email}</TextWrap>
                   </FieldWrap>
                   <FieldWrap>
                       <Label>{t("Register/Roles")}</Label>
                       {profileInfo?.roles?.map(r => <TextWrap key={r}><SpanName>{r}</SpanName></TextWrap>)}
                   </FieldWrap>
               </Wrapper>
            </Info>
        </Outer>

    )
}

export default ProfileInfoField