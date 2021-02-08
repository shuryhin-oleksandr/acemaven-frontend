import React from 'react'
import {IAddNewBank} from "../../../../../../_BLL/types/addNewUserTypes";
import {
    CardContent,
    CardWrap,
    Data,
    DefaultIcon,
    DefaultText,
    DefaultWrap,
    Label,
    LineWrap,
    SetDefaultButton,
    Wrapper
} from "../bank-list-styles";
import deleteIcon from '../../../../../assets/icons/delete.svg'
import defaultIcon from '../../../../../assets/icons/defaultBank.svg'
import {IconButton} from "@material-ui/core";


type PropsType = {
    b?: IAddNewBank,
    max_width?: string,
    flex_direction?: string,
    w?: string,
    deleteBank?: (value: number) => void;
    defaultBank?: (value: number) => void;
    current_user_role?: string[]
}

const BankCard: React.FC<PropsType> = ({max_width, w, b, deleteBank, defaultBank, flex_direction, ...props}) => {

    return (
        <CardWrap max_width={max_width}>
            <CardContent>
                {(props.current_user_role?.includes('master') || props.current_user_role?.includes('billing'))
                &&
                <IconButton onClick={() => deleteBank && deleteBank(b?.id as number)}
                            style={{position: 'absolute', right: '5px', top: '5px'}}
                >
                    <img src={deleteIcon} alt=""/>
                </IconButton>
                }

                <Wrapper>
                    <LineWrap w={w} flex_direction={flex_direction}>
                        <Label>Bank Name</Label>
                        <Data>{b?.bank_name}</Data>
                    </LineWrap>
                    <LineWrap w={w} flex_direction={flex_direction}>
                        <Label>Bank No.</Label>
                        <Data>{b?.bank_number}</Data>
                    </LineWrap>
                    <LineWrap w={w} flex_direction={flex_direction}>
                        <Label>Branch No.</Label>
                        <Data>{b?.branch}</Data>
                    </LineWrap>
                    <LineWrap w={w} flex_direction={flex_direction}>
                        <Label>Account No.</Label>
                        <Data>{b?.number}</Data>
                    </LineWrap>
                    <LineWrap w={w} flex_direction={flex_direction}>
                        <Label>Account Type</Label>
                        <Data>{b?.account_type}</Data>
                    </LineWrap>
                </Wrapper>
                <DefaultWrap>
                    {b?.is_default && <DefaultIcon><img src={defaultIcon} alt=""/></DefaultIcon>}
                    {b?.is_default
                        ? <DefaultText>Default Bank</DefaultText>
                        : (props.current_user_role?.includes('master') || props.current_user_role?.includes('billing'))
                        &&
                        <SetDefaultButton onClick={() => defaultBank && defaultBank(b?.id as number)}>
                            Set as default
                        </SetDefaultButton>
                    }
                </DefaultWrap>
            </CardContent>
        </CardWrap>
    )
}

export default BankCard