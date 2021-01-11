import styled from 'styled-components'

export const OperationsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
 flex-direction: column;
 align-items: center;
`
export const OperationsInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px 10px 0 0 ;
  box-shadow: 4px 0 0 rgba(0, 0, 0, 0.1);
`
export const OperationsContent = styled.div<{isHide?: boolean, status?: string}>`
  width: 100%;
  height: ${({isHide}) => !isHide ? '530px' : '100%'};
  padding: ${({status}) => (status === 'canceled' || status === "completed") ? '50px 80px 50px 30px' : '20px 80px 50px 30px'};
   display: flex;
  flex-direction: column;
`
export const OperationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;
`
export const OperationTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
`
export const HideButton = styled.button<{isHide?: boolean}>`
  outline: none;
  background: none;
  border: none;
  margin-top: 10px;
  transform: rotate(${({isHide}) => isHide && '180deg'});
  
  &:hover {
    cursor: pointer;
  }
`