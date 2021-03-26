import styled, {keyframes} from 'styled-components'

let shown = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${shown} ease-in-out .3s;
`
export const ChatInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 400px 55px 30px;
`
export const ChatContent = styled.div<{max_height_chat_area?:string}>`
  width: 100%;
 max-height: ${({max_height_chat_area})=>max_height_chat_area};
 overflow-y: auto;
`
export const UploadWrapper = styled.form`
 
`
export const LabelUpload = styled.label`
cursor: pointer;
display: flex;
align-items: center;
transition: .4s;
height: 40px;
width: 40px;
justify-content: center;
border-radius: 50px;
&:hover {
  cursor: pointer;
  transition: .4s;
  background-color: rgba(0, 0, 0, .07);
}
`
export const UploadInput = styled.input`
 opacity: 0;
 position: absolute;
 z-index: -1;
`

export const MessageWrapper = styled.div<{ direction?: string, justify?: string }>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: ${({direction}) => direction ? direction : 'row'};
  justify-content: ${({justify}) => justify ? justify : 'flex-start'};
`
export const PhotoWrapper = styled.div<{ margin_right?: string, margin_left?: string }>`

  width: 40px;
  height: 40px;
  border-radius: 100px;
  margin-right: ${({margin_right}) => margin_right ? margin_right : '19px'};
  margin-left: ${({margin_left}) => margin_left ? margin_left : '19px'};
   
   img {
      object-fit: cover;
      width: 40px;
      height: 40px;
      border-radius: 100px;
    }
`
export const LocalTimeWrapper = styled.div<{ margin?: string }>`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  line-height: 16.04px;
  color: #828282;
  margin: ${({margin}) => margin && margin}
`
export const DeleteWrap = styled.div`
  animation: ${shown} ease-in-out .3s;
   transition: .3s;
  img {
    padding: 0 20px;
  }
  &:hover {
    cursor: pointer;
  }
  
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
  background-color: rgba(26, 184, 230, .3);
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
  margin-left: 15px;
`
export const MessageInput = styled.textarea`
  width: 100%;
  border: 1px solid #115B86;
  font-family: "Helvetica Reg", sans-serif;
  color: #1B1B25;
  font-size: 16px;
  line-height: 18.34px;
  padding: 10px 55px 16px 16px;
  outline: none;
  resize: vertical;
  max-height: 150px;
  min-height: 55px;
  
  &::placeholder {
    font-family: "Helvetica Reg", sans-serif;
    color: #115B86;
    font-size: 16px;
    line-height: 18.34px;
    transition: .3s;
    padding-top: 10px;
  }
  &:focus::placeholder {
    transition: .3s;
    color: transparent;
  }
`
export const NoPermissionsWrap = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.38);
  height: 55px;
  padding: 16px 55px 16px 16px;
  display: flex;
  align-items: center;
`
export const NoPermissionIcon = styled.div`
margin-right: 5px;
display: flex;
`

export const NoPermissionsMessage = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  color: rgba(0, 0, 0, 0.63);
  font-size: 16px;
  line-height: 18.34px;
`