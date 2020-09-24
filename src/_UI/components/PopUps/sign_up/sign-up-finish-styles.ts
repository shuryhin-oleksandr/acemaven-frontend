import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 260px;
  background-color: white;
`

export const TextWrap = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  color: #828282;
  font-size: 18px;
  margin-bottom: 30px;
`
export const ButtonWrap = styled.div`
  height: 40px;
  width: 130px;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`