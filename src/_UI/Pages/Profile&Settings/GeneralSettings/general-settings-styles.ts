import styled from 'styled-components'

export const GeneralContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
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
  padding: 80px 50px 50px 30px;
`
export const SettingsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
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
  max-width: 108px;
  width: 100%;
  color: #BDBDBD;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  padding: 12px 20px 12px 10px;
  margin-left: 23px;
  
  &::placeholder {
    color: #BDBDBD;
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
  }
`
export const LineWrap = styled.div`
  width: 100%;
  height: 1px;
  background-color: #BDBDBD;
`
