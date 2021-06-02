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
  height: ${({isHide, status}) => (isHide || status !== 'active') ? '100%' : '530px'};
  padding: ${({status}) => (status === 'canceled' || status === "completed") ? '50px 55px 50px 0' : '0 55px 50px 0'};
   display: flex;
  flex-direction: column;
`
export const OperationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
export const OperationTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  padding-left: 30px;
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