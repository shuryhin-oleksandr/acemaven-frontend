import styled, {keyframes} from 'styled-components'

const showLabel = keyframes`
 0% {
  opacity: 0;
 }
 100% {
  opacity: 1;
 }
`

type PropsStyle = {
    isFocus?: boolean,
    error?: string
}

export const InputOuter = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin-bottom: 15px;
`
export const Field = styled.input<PropsStyle>`
  padding: 10px;
  color: #828282;
  font-size: 14px;
  font-family: 'Helvetica Light',sans-serif;
  line-height: 17px;
  
  transition: .5s;
  height: 40px;
  border: ${({error}) => error ? '1px solid #7C7C89' : '1px solid #BDBDBD'};
  border-radius: 4px;
  outline: none;
  background: ${({error}) => error ? '#ECECEC' : 'white'};
  
  &:focus:active:visited {
    transition: .5s;
    border: 1px solid #7C7C89;
  }
  
  &::placeholder {
    transition: .5s;
    color: #828282;
    font-size: 14px;
    font-family: 'Helvetica Light',sans-serif;
    line-height: 17px;
    
  }
  &:focus::placeholder {
        opacity: 0;
        transition: .5s;
    }
  
`
export const Label = styled.div<PropsStyle>`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 9px;
  opacity: ${({isFocus, error}) => (isFocus || error) ? '1' : '0'};
  animation: ${showLabel} ease-in-out .3s;
`
export const HelperText = styled.div`
padding-top: 9px;
color: red;
font-family: "Helvetica Reg", sans-serif;
width: 100%;
text-align: end;
font-size: 12px;
`
