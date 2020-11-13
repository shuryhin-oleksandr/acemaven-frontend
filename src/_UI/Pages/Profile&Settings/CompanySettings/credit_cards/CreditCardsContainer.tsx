import React, {useState} from 'react'
//components
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import CreditCardCard from "./CreditCardCard";
import CreditCardForm from "./CreditCardForm";
//styles
import {CreditCardsInner, CreditCardsWrapper} from "./credit-cards-styles";


type PropsType = {
    credit_cards: any[]
}

const CreditCardsContainer:React.FC<PropsType> = ({credit_cards}) => {
    const [isAdd, setIsAdd] = useState(false)

    return (
        <CreditCardsWrapper>
            <CreditCardsInner>
                {!isAdd
                    ? <AddNewButton setIsAdd={setIsAdd}/>
                    : <CreditCardForm setIsAdd={setIsAdd}/>
                }
                {credit_cards.length > 0 && credit_cards.map(c => <CreditCardCard card={c}/>)}
            </CreditCardsInner>
        </CreditCardsWrapper>
    )
}

export default CreditCardsContainer