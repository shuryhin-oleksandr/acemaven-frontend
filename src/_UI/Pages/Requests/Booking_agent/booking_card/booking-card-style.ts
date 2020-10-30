import styled from 'styled-components'

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
`
export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 80px 50px 30px;
`
export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const BookingNumber = styled.div`
  margin-bottom: 17px;
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  line-height: 57.26px;
`
export const BookingStatus = styled.span`
  font-family: "Helvetica Reg", sans-serif;
  color: #1b1b25;
  font-size: 18px;
  line-height: 21px;
  text-transform: capitalize;
`
export const ActionsButtons = styled.div`
  display: flex;
`
export const AcceptButton = styled.button`
  height: 40px;
  width: 134px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  
  &:hover {
    cursor: pointer;
  }
`
export const AssignButton = styled(AcceptButton)``
export const RejectButton = styled.button`
  height: 40px;
  width: 134px;
  outline: none;
  border: 1px solid #3b3b41;
  background: none;
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`