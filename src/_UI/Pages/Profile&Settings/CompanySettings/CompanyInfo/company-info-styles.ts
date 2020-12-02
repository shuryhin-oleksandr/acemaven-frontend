import styled, {keyframes} from 'styled-components'

let show_skelet = keyframes`
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
`

export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  animation: ${show_skelet} ease-in-out .2s;
`

export const InfoInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 80px 40px 7px;
`
export const InfoHeader = styled.div`
display: flex;
margin-bottom: 30px;
`
export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right:30px;
`
export const InfoLabel = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: #115B86;
  font-size: 18px;
  margin-bottom: 10px;
`
export const InfoText = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  color: black;
  font-size: 18px;
`
export const LineWrap = styled.div`
background-color: #BDBDBD;
height: 1px;
`

export const FieldsWrap = styled.div`
  padding-top: 30px;
  display: flex;
  width: 100%;
 
  justify-content: space-between;
`
export const FieldsContent = styled.div`
display: flex;
flex-wrap: wrap;
width: 70%;
`
export const EditIcon = styled.button`
  outline: none;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  
  &:hover {
    cursor: pointer;
  }
`
export const Field = styled.div`
display: flex;
flex-direction: column;
min-width: 205px;
width: 33.3%;
margin-bottom: 15px;
`
export const Label = styled.div`
 color: #115B86;
 font-family: "Helvetica Bold", sans-serif;
 font-size: 18px;
 margin-bottom: 10px;
`
export const TextWrap = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  color: black;
`
export const FormContainer = styled.form`
padding-top: 30px;
display: flex;
justify-content: space-between;
`
export const FormWrap = styled.div`
max-width: 700px;
width: 100%;
height: 100%;
`

export const ButtonsWrap = styled.div`
  padding-left: 15px;
`