import styled from 'styled-components'

type PropsStyle = {
   role?: string
}

export const FormContainer = styled.form`
  width: 100%;
  height: 100%;
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