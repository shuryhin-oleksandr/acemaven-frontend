import React, {useState} from 'react'
//components
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import CreditCardCard from "./CreditCardCard";
import CreditCardForm from "./CreditCardForm";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import {CreditCardsInner, CreditCardsWrapper} from "./credit-cards-styles";


type PropsType = {
    credit_cards: any[]
}

const CreditCardsContainer:React.FC<PropsType> = ({credit_cards}) => {
    const [isAdd, setIsAdd] = useState(false)

    return (
      <ScrollbarStyled {...{style: {height: "100%"}}}>
        <CreditCardsWrapper>
            <CreditCardsInner>
                {!isAdd
                    ? <AddNewButton setIsAdd={setIsAdd}/>
                    : <CreditCardForm setIsAdd={setIsAdd}/>
                }
                {credit_cards.length > 0 && credit_cards.map(c => <CreditCardCard card={c}/>)}
            </CreditCardsInner>
        </CreditCardsWrapper>
      </ScrollbarStyled>
    )
}

export default CreditCardsContainer