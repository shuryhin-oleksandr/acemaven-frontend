import React, {useState} from 'react'
//components
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import CreditCardCard from "./CreditCardCard";
import CreditCardForm from "./CreditCardForm";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {CreditCardsInner, CreditCardsWrapper} from "./credit-cards-styles";
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";


type PropsType = {
    credit_cards: any[],
    current_user_role?: string[],
    isFetching: boolean
}

const CreditCardsContainer:React.FC<PropsType> = ({credit_cards, current_user_role, isFetching}) => {
    const [isAdd, setIsAdd] = useState(false)

    return (
        <>
            {isFetching
                ? <SpinnerForAuthorizedPages min_height='100%'/>
                : <ScrollbarStyled {...{style: {height: "100%"}}}>
                    <CreditCardsWrapper>
                        <CreditCardsInner>
                            {!current_user_role?.includes('agent') &&
                                (!isAdd
                                    ? <AddNewButton setIsAdd={setIsAdd}/>
                                    : <CreditCardForm setIsAdd={setIsAdd}/>
                                )}
                            {credit_cards.length > 0 && credit_cards.map(c => <CreditCardCard card={c}/>)}
                        </CreditCardsInner>
                    </CreditCardsWrapper>
                </ScrollbarStyled>
            }
        </>
    )
}

export default CreditCardsContainer