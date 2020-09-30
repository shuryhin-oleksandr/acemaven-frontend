import styled from 'styled-components'
import back from "../../../../../_UI/assets/icons/3620.png";


export const Outer = styled.div`
  width: 100%;
  min-width: 100vw;
  background-image: url(${back});
  background-repeat: round;
  height: 100vh;
`

export const UpperPart = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 40px 165px 40px 100px;
  
`
export const LogoWrap = styled.div`

`
export const ActionsWrapper = styled.div`
display: flex;
`
export const LoginButton = styled.div`
  outline: none;
  background: none;
  border: none;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  
  &:hover {
    cursor: pointer;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding-right: 160px;
`
export const Title = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 64px;
  line-height: 75px;
  color: white;
  margin-top: 60px;
  margin-bottom: 20px;
  max-width: 385px;
  min-width: 385px;
  width: 100%;
  text-align: end;
`
export const SubTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 20px;
  line-height: 23.65px;
  color: white;
  margin-bottom: 70px;
  max-width: 264px;
  min-width: 264px;
  width: 100%;
  text-align: end;
`


