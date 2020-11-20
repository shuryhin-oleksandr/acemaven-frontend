import styled from 'styled-components'

type PropsStyle = {
    height?: string
}

export const PopupWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, .3);
  z-index: 70;
`

export const PopupInner = styled.div<PropsStyle>`
  max-width: 700px;
  height: ${({height}) => height ? height : '600px'};
  width: 100%;
 background-color: white;
 position: relative;
`
export const PopupContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 45px;
`
export const PopupTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  color: #1b1b25;
  font-size: 16px;
  line-height: 21px;
  width: 100%;
  text-align: center;
  margin-bottom: 33px;
`
export const UsersList = styled.div`
  height: 440px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const UserRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  height: 104px;
  border: 1px solid #ececec;
  margin-bottom: 10px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.13);
`
export const UserRowInfo = styled.div`
  display: flex;
  align-items: center;
`
export const UserPhoto = styled.div`
  display: flex;
  margin-right: 9px;
  
  img{
    width: 64px;
    height: 64px;
    border: 3px solid #115b86;
    border-radius: 50px;
  }
`
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`
export const UserName = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: black;
  text-transform: capitalize;
  margin-bottom: 5px;
`
export const UserRole = styled.div`
  color: #115b86;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  text-transform: capitalize;
`
export const UserRowAssignButton = styled.button`
  height: 40px;
  width: 130px;
  border: none;
  outline: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  
  &:hover {
    cursor: pointer;
  }
`
export const AssignActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const AssignConfirm = styled(UserRowAssignButton)`
margin-right: 15px;
`
export const AssignCancel = styled.button`
  height: 40px;
  width: 130px;
  border: 1px solid #3b3b41;
  outline: none;
  background-color: transparent;
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: .3s;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`