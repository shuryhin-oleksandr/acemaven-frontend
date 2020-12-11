import styled from 'styled-components'


export const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
`
export const ChatInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 400px 55px 30px;
`
export const MessageWrapper = styled.div<{direction?: string, justify?: string}>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: ${({direction}) => direction ? direction : 'row'};
  justify-content: ${({justify}) => justify ? justify : 'flex-start'};
  margin-bottom: 50px;
`
export const PhotoWrapper = styled.div<{margin_right?: string, margin_left?: string}>`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin-right: ${({margin_right}) => margin_right ? margin_right : '19px'};
  margin-left: ${({margin_left}) => margin_left ? margin_left : '19px'};
   
   img {
      width: 100%;
      height: 100%;
      border-radius: 100px;
    }
`
export const LocalTimeWrapper = styled.div<{margin?: string}>`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  line-height: 16.04px;
  color: #828282;
  margin: ${({margin}) => margin && margin}
`

export const MessageText = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  line-height: 18.34px;
  
  color: white;
  background-color: rgba(17, 91, 134, .7);;
  padding: 15px 29px 15px 24px;
  border-radius: 20px 0 20px 20px;
`
export const MessageTextAnotherUser = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  line-height: 18.34px;
  color: #1B1B25;
  background-color: rgba(26, 184, 230, .2);
  padding: 15px 29px 15px 24px;
  border-radius: 0 20px 20px 20px;
  
`
export const MessageTypingWrapper = styled.div`
  background-color: rgba(26, 184, 230, .2);
  padding: 15px 29px 15px 24px;
  border-radius: 0 20px 20px 20px;
  height: 50px;
  width: 100px;
  position: relative;
  img {
    width: 75px;
    position: absolute;
    top: -12px;
    left: 12px;
  }
`
export const MessageInputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`
export const MessageInput = styled.input`
  width: 100%;
  height: 53px;
  border: 1px solid #115B86;
  font-family: "Helvetica Reg", sans-serif;
  color: #1B1B25;
  font-size: 16px;
  line-height: 18.34px;
  padding: 16px 18px 16px 30px;
  outline: none;
 
  
  &::placeholder {
    font-family: "Helvetica Reg", sans-serif;
    color: #115B86;
    font-size: 16px;
    line-height: 18.34px;
  }
`