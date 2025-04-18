import styled, {keyframes} from 'styled-components'

type PropsStyle = {
    c?: string,
    bc?: string,
    w?: string
}

let show_skeleton = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const SurchargeContainer = styled.form`
padding: 50px 80px 80px 30px;
height: 100% ;
width: 100%;
animation: ${show_skeleton} ease-in-out .2s;
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
  min-height: 165px;
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
  margin-right: 40px;
`
export const FieldOuter = styled.div`
  width: 100%;
  min-width: 110px;
  max-width: 195px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
`
export const Label = styled.div`
  text-transform: uppercase;
  color: #115B86;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
`
export const Content = styled.div<PropsStyle>`
  color: ${({c}) => c ? c : 'black'};
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  text-transform: capitalize;
  line-height: 1;
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

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 96px;
`
export const FormButtons = styled.div`
display: flex;
max-width: 325px;
width: 100%;
justify-content: space-between;
`
export const SaveButton = styled.button`
  outline: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  border: none;
  height: 40px;
  width: 200px;
  padding: 0;
  &:hover {
    cursor: pointer
  }
`

export const CancelButtonWrap = styled.button<PropsStyle>`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
height: 40px;
max-width: ${({w}) => w ? w : '115px'};
width: 100%;
color: #3B3B41;
transition: .3s;

&:hover {
 transition: .3s;
 background-color: #E0E0E0;
cursor: pointer
}
`
