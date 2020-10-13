import styled from "styled-components";

type PropsStyle = {
    mode?: string
}

export const Outer = styled.form`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
padding: 50px 80px 30px 30px;
`
export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const ActionsWrapper = styled.div`
display: flex;
`
export const RegisterButton = styled.button`
outline: none;
border: none;
background-color: black;
color: white;
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
height: 40px;
width: 170px;
display: flex;
align-items: center;
justify-content: center;
margin-right: 15px;
padding: 0;

&:hover {
cursor: pointer;
}
`
export const FormTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  margin-bottom: 35px;
`
export const OptionsButtonsWrap = styled.div`
  min-width: 150px;
  max-width: 150px;
  height: 40px;
  width: 100%;
  background-color: #ECECEC;
  border-radius: 2px;
  border: 1px solid #ECECEC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-bottom: 25px;
`
export const OptionButton = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  max-width: 68px;
  height: 32px;
  background-color: ${({mode}) => mode === 'ship'  ? '#1AB8E5' : 'transparent'};
  border-radius: 2px;
  box-shadow: ${({mode}) => mode === 'ship'  && '1px 1px 4px rgba(0, 0, 0, 0.25)'};
  transition: .3s;
  
  &:hover {
    cursor: pointer;
  }
`
export const OptionButtonPlane = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  max-width: 68px;
  height: 32px;
  background-color: ${({mode}) => mode === 'plane' ?  '#1AB8E5' : 'transparent'};
  border-radius: 2px;
  box-shadow: ${({mode}) => mode === 'plane' && '1px 1px 4px rgba(0, 0, 0, 0.25)'};
  transition: .3s;
  
  &:hover {
    cursor: pointer;
  }
`

export const FormWrap = styled.div`
display: flex;
margin-bottom: 20px;
`
export const GroupWrap = styled.div`
display: flex;
flex-direction: column;
max-width: 420px;
width: 100%;
margin-right: 70px;
`

export const LineWrap = styled.div`
height: 1px;
background-color: #115B86;
`
export const UnderTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  color: #1B1B25;
  font-size: 24px;
  width: 100%;
  text-align: center;
  padding-top: 35px;
`