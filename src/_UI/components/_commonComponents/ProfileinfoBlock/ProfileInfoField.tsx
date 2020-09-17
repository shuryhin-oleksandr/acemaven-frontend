import React from 'react'
import {FieldWrap, Info, Label, Outer, TextWrap} from './profile-info-field-styles'

type PropsType = {
    info1: any,
    info2: any
}

const ProfileInfoField:React.FC<PropsType> = ({info1, info2}) => {
    return (
        <Outer>
            <Info>
            {info1.map((i: any) => <FieldWrap key={i.name}>
                    <Label>{i.name}</Label>
                    <TextWrap>{i.value}</TextWrap>
                </FieldWrap>
           )}
            </Info>
            <Info>
                {info2.map((i:any) =>  <FieldWrap key={i.name}>
                    <Label>{i.name}</Label>
                    <TextWrap>{i.value}</TextWrap>
                </FieldWrap>)}

            </Info>
        </Outer>

    )
}

export default ProfileInfoField