import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const ClientQuotesOuter = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  animation: ${skelet_appear} ease-in-out .4s;
`
export const ClientQuotesInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 55px 50px 0;
`

export const NoQuotesOuter = styled.div`
  max-width: 794px;
  width: 100%;
  border: 1px solid #bdbdbd;
  margin-left: 30px;
`
export const NoQuotesContent = styled.div`
  padding: 60px 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f4f4f;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
`
export const OfferOuter = styled.div`
  width: 100%;
  border-bottom: 1px solid #bdbdbd;
`
export const OfferInner = styled.div`
  padding: 20px 280px 0 80px;
  width: 100%;
`
export const BookLittleButton = styled.div`
  background-color: #115b86;
  color: white;
  padding: 5px 10px;
  outline: none;
  border: none;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`
export const CargosOuter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  height: 100%;
  overflow-y: auto;
`


