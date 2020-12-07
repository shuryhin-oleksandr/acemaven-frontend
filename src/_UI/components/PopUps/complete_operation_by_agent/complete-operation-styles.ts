import styled from 'styled-components'

export const CompleteOperationPopupWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
export const CompleteOperationPopupInner = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  position: relative;
`
export const CompleteOperationPopupContent = styled.div`
  padding: 60px 130px;
  display: flex;
  flex-direction: column;
`
export const CompleteTitle = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 45px;
`
export const CompleteSubtitle = styled.div`
  color: #4f4f4f;
  font-family: "Helvetica Light", sans-serif;
  font-size: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`
export const CompleteButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const CompleteConfirmButton = styled.button`
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  max-width: 146px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: black;
  margin-right: 15px;
  
  &:hover {
    cursor: pointer;
  }
`
export const CompleteCancelButton = styled.button`
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  max-width: 146px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 1px solid #3b3b41;
  background-color: white;
  transition: .2s;
  
  &:hover {
    cursor: pointer;
    transition: .2s;
    background-color: rgba(0, 0, 0, .07);
  }
`