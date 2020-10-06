import styled from 'styled-components'

type PropsStyle = {
    minWidth?: string
}

export const SeaContainer = styled.div<PropsStyle>`
  max-width: ${({minWidth}) => minWidth ? minWidth : '610px'};
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const LineWrap = styled.div`
  width: 100%;
  max-width: 1289px;
  position: absolute;
  height: 1px;
  background-color: #E5E5E5;
  
`
export const HandlingSurchargeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 38px;
`
export const HandlingTitle = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  font-family: "Helvetica Bold", sans-serif;
  color: #1AB8E5;
  margin-bottom: 24px;
`