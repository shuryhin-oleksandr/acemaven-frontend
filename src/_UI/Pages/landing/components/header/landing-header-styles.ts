import styled from 'styled-components'

type PropsStyle = {
    background_img?: string,
    background_repeat?: string,
    login_color?: string,
    subtitle_max_width?: string
    background_size?: string
}

export const Outer = styled.div<PropsStyle>`
  width: 100%;
 
  background-image: url(${props => props.background_img});
  background-repeat: ${({background_size}) => background_size === "cover" ? "unset" : "round"};
  height: 100%;
  background-size: ${({background_size}) => background_size ? background_size : "auto auto"};
  background-position: ${({background_size}) => background_size === "cover" ? "center" : "0% 0%"};
  
  @media (max-width: 1440px) {
    background-repeat: ${({background_repeat, background_size}) => background_repeat ? background_repeat : background_size === "cover" ? 'unset' : 'round'};
  }
  
`

export const UpperPart = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 40px 120px 40px 100px;
  
`
export const LogoWrap = styled.div`

`
export const ActionsWrapper = styled.div`
display: flex;
`
export const LoginButton = styled.div<PropsStyle>`
  outline: none;
  background: none;
  border: none;
  color: ${({login_color}) => login_color ? login_color : 'white'};
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
  padding-right: 120px;
`
export const Title = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 64px;
  line-height: 75px;
  color: white;
  margin-top: 60px;
  margin-bottom: 20px;
  width: 395px;
  text-align: end;
  display: flex;
  flex-direction: column;
`
export const SubTitle = styled.div<PropsStyle>`
  font-family: "Helvetica Light", sans-serif;
  font-size: 20px;
  line-height: 23.65px;
  color: white;
  margin-bottom: 70px;
  max-width: ${({subtitle_max_width}) => subtitle_max_width ? subtitle_max_width : '407px'};
  min-width: 326px;
  width: 100%;
  text-align: end;
`


