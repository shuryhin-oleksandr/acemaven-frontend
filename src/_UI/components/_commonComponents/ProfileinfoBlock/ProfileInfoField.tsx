import React from 'react'
import {FieldWrap, Info, Label, Outer, SpanName, TextWrap, Wrapper} from './profile-info-field-styles'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";

type PropsType = {
}

const ProfileInfoField:React.FC<PropsType> = () => {

    const profileInfo = useSelector((state: AppStateType) => state.profile.authUserInfo)
    return (
        <Outer>
            <Info>
                <Wrapper>
                    <FieldWrap>
                        <Label>Name</Label>
                        <TextWrap>{profileInfo?.first_name}</TextWrap>
                    </FieldWrap>
                    <FieldWrap>
                        <Label>Last Name</Label>
                        <TextWrap>{profileInfo?.last_name}</TextWrap>
                    </FieldWrap>
                    <FieldWrap>
                        <Label>Position in the Company</Label>
                        <TextWrap>{profileInfo?.position}</TextWrap>
                    </FieldWrap>
                </Wrapper>
               <Wrapper>
                   <FieldWrap>
                       <Label>Phone Number</Label>
                       <TextWrap>{profileInfo?.phone}</TextWrap>
                   </FieldWrap>
                   <FieldWrap>
                       <Label>Email</Label>
                       <TextWrap>{profileInfo?.email}</TextWrap>
                   </FieldWrap>
                   <FieldWrap>
                       <Label>Roles</Label>
                       {profileInfo?.roles?.map(r => <TextWrap key={r}><SpanName>{r}</SpanName></TextWrap>)}
                   </FieldWrap>
               </Wrapper>
            </Info>
        </Outer>

    )
}

export default ProfileInfoField