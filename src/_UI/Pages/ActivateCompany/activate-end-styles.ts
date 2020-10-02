import styled from 'styled-components'

export const ActivateContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ActivateInner = styled.div`
  max-width: 351px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const EndText = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  color: black;
  margin-bottom: 30px;
 text-align: center;
`
export const EndButton = styled.div`
  outline: none;
  background-color: black;
  border: none;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: white;
  height: 40px;
  width: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`