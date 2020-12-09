import styled from 'styled-components'


export const TakeOverWrapper = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
`
export const TakeOverInner = styled.div`
max-width: 700px;
width: 100%;
background-color: white;
position: relative;

`
export const TakeOverContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 52px 139px;
`
export const TakeOverTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  color: black;
  font-size: 16px;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`
export const TakeOverActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export const TakeOverButton = styled.button`
  outline: none;
  background-color: black;
  border: none;
  height: 40px;
  max-width: 146px;
  width: 100%;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  
  &:hover {
    cursor: pointer;
  }
`
export const CancelTakeOverButton = styled.button`
  outline: none;
  background-color: white;
  border: 1px solid #3b3b41;
  height: 40px;
  max-width: 146px;
  width: 100%;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  transition: .2s;
  
  &:hover {
    transition: .2s;
    cursor: pointer;
    background-color: rgba(0,0,0,.07);
    
  }
`

