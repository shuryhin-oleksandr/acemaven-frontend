import React from 'react'
import styled from "styled-components";

type PropsType = {
    openCreatePopup: (value: boolean) => void
}

const NoRateSurchargeCard:React.FC<PropsType> = ({openCreatePopup}) => {
    return (
        <NoRatesOuter>
            <NoRatesContent>
                There are no freight rate and surcharges for these shipment dates.
                The offer won't be created until a matching freight rate and surcharges agreement is created.
            </NoRatesContent>
            <RegisterButton type={'button'} onClick={() => openCreatePopup(true)}>REGISTER NEW</RegisterButton>
        </NoRatesOuter>
    )
}

export default NoRateSurchargeCard


const NoRatesOuter = styled.div`
  max-width: 794px;
  width: 100%;
  border: 1px solid #bdbdbd;
  padding: 30px 87px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  min-height: 230px;
`
const NoRatesContent = styled.div`
  color: #4f4f4f;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 30px;
`

const RegisterButton = styled.button`
  height: 50px;
  width: 200px;
  background-color: black;
  outline: none;
  border: none;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`