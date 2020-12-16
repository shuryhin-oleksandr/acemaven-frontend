import styled, {keyframes} from 'styled-components'

let show_skeleton = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const NotificationsWrapper = styled.div`
width: 100%;
height: 100%;
animation: ${show_skeleton} ease-in-out .2s;
`
export const NotificationsInner = styled.div`
width: 100%;
height: 100%;
padding: 50px 50px 50px 30px;
`
export const NotificationsContent = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
`
export const NotificationsTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
  margin-bottom: 22px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const SectionWrapper =  styled.div`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`
export const CardOuter = styled.div`
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 15px;
  display: flex;
  margin-bottom: 36px;
`
export const IconWrapper = styled.div`
  margin-right: 10px;
  img {
    box-shadow: 3px 2px 4px rgba(0,0,0,0.15);
  }
`
export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const NotificationsBlock = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  color: black;
  margin-bottom: 10px;
`
export const NotificationsDate = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: #828282;
  margin-bottom: 10px;
 
`
export const NotificationsDescription = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: #333333;
`