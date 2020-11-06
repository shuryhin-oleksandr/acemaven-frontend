import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  z-index: 640;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background-color: rgba(0, 0, 0, .3);
`
export const Inner = styled.div`
max-width: 700px;
width: 100%;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
padding: 165px 190px 256px;
max-height: 512px;
height: 100%;
`
export const TextWrap = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  color: #828282;
  font-size: 18px;
  margin-bottom: 30px;
`
export const ButtonWrap = styled.button`
  height: 40px;
  width: 130px;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  
  &:hover {
    cursor: pointer;
  }
`