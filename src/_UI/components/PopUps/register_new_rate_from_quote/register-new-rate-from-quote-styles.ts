import styled from 'styled-components'


export const RegisterRateWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 100px;
`
export const RegisterRateInner = styled.div`
  max-width: 1275px;
  width: 100%;
  background-color: white;
  position: relative;
`
export const RegisterRateContent = styled.div`
  width: 100%;
  padding: 60px 20px 60px 40px;
  display: flex;
  flex-direction: column;
`
export const HeaderControllers = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 40px;
  border-bottom: 1px solid #bdbdbd;
  margin-bottom: 38px;
`
export const FormButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
export const FormButton = styled.button`
  display: flex;
  width: 120px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: black;
  outline: none;
  border: none;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-right: 15px;
  
  &:hover {
    cursor: pointer
  }
`
export const FormCancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: 1px solid #3b3b41;
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  transition: .3s;
  width: 130px;
  height: 40px;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`


