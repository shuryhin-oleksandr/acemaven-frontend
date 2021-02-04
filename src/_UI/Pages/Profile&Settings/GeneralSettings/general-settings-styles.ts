import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const GeneralContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: ${skelet_appear} ease-in-out .4s;
`
export const GeneralInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; 
`

export const GeneralTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
  margin-bottom: 32px;
   width: 100%;
  display: flex;
  padding: 51px 50px 32px 30px;
`
export const SettingsWrap = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 200px 0 7px;
`
export const SettingsTitle = styled.div`
  color: black;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
`
export const SettingsSubtitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: #3B3B41;
  margin-bottom: 15px;
  max-width: 800px;
  width: 100%;
  flex-wrap: wrap;
`
export const ActionsWrap = styled.div`
display: flex;
align-items: center;
margin-bottom: 15px;
`
export const SettingsField = styled.input`
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #B7BCD6;
  border-radius: 4px;
  outline: none;
  max-width: 108px;
  width: 100%;
  color: rgba(0, 0, 0, .7);
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  padding: 12px 20px 12px 10px;
  margin-left: 23px;
  
  &::placeholder {
    color: #BDBDBD;
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
    transition: 0.5s;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus::placeholder {
    opacity: 0;
    transition: 0.5s;
  }
  &:disabled {
    background-color: #ECECEC;
  }
`
export const LineWrap = styled.div`
  width: 100%;
  height: 1px;
  background-color: #BDBDBD;
`
