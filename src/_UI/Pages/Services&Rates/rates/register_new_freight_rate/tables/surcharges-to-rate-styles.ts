import styled, {keyframes} from 'styled-components'

const openTable = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

type PropsStyle = {
    length?: any
}

export const SurchargeForRateContainer = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top:${({length}) => length ? length : 0 };
`
export const SurchargeToRateInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 25px 0;
`
export const SurchargeTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
export const TextWrap = styled.div`
  color: #1AB8E5;
  font-family: 'Helvetica Bold', sans-serif;
  font-size: 20px;
`
export const Arrow = styled.button`
  outline: none;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`
export const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;
  animation: ${openTable} ease-in-out .3s;
`