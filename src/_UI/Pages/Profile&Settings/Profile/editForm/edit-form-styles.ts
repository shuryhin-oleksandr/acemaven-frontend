import styled from 'styled-components'

type PropsStyle = {
   role?: string
}

export const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 51px 80px 51px 30px;
  display: flex;
  flex-direction: column;
`
export const ButtonsWrap = styled.div`
display: flex;
`

export const FormWrap = styled.div`
max-width: 420px;
width: 100%;
display: flex;
flex-direction: column;
`
export const RolesWrap = styled.div`
display: flex;
flex-direction: column;
`
export const Roles = styled.div`
font-family: "Helvetica Reg", sans-serif;
font-size: 16px;
`
export const Role = styled.div<PropsStyle>`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  text-transform: capitalize;
   color: ${({role}) => (role === 'agent') ? '#115B86' : (role === 'billing') ? '#1AB8E6' : 'black'}
`
export const ChangeFormWrap = styled.form`
  max-width: 500px;
  max-height: 422px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 30;
  padding: 45px 40px;
  position: relative;
`
export const ActionsButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const SuccessMessage = styled.div`
color: darkgreen;
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
width: 100%;
display: flex;
justify-content: flex-end;
`
export const CloseButton = styled.button`
outline: none;
background: none;
border: none;
position: absolute;
top: 5%;
right: 4%;

&:hover {
  cursor: pointer;
}
`
