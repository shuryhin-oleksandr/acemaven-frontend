import styled from 'styled-components'

type PropsStyle = {
    c?: string,
    bc?: string
}

export const SurchargeContainer = styled.form`
padding: 50px 80px 30px 30px;
height: 100% ;
min-height: 100vh;
width: 100%;
`
export const SurchargeContent = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
`
export const SurchargeTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
  margin-bottom: 40px;
`

export const InfoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
 
`
export const ShippingMode = styled.div`
  width: 99px;
  height: 99px;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
  }
`
export const FieldsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 50px;
`
export const FieldOuter = styled.div`
  width: 100%;
  min-width: 110px;
  max-width: 195px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`
export const Label = styled.div`
  text-transform: uppercase;
  color: #115B86;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  margin-bottom: 6px;
`
export const Content = styled.div<PropsStyle>`
  color: ${({c}) => c ? c : 'black'};
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  text-transform: capitalize;
`
export const ContentDate = styled(Content)`
  border: 1px solid #BDBDBD;
  border-radius: 4px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  
  &:hover {
    cursor: pointer;
  }
`
export const LineWrap = styled.div<PropsStyle>`
width: 100%;
height: 1px; 
background-color: ${({bc}) => bc ? bc : '#115B86'};
margin-top: 30px;
`
export const BorderSpan = styled.div`
  border-radius: 4px;
  border: 1px solid #BDBDBD;
  width: 95px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`
