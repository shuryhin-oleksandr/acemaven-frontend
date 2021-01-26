import styled from 'styled-components'

export const AcceptWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding-top: 100px;
  padding-bottom: 100px;
  z-index: 70;
`
export const AcceptInner = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  position: relative;
`
export const AcceptContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 80px 60px;
  display: flex;
  flex-direction: column;
`
export const AcceptContentTitle = styled.div`
 font-family: "Helvetica Light", sans-serif;
 font-size: 18px;
 color: black;
 text-align: center;
 margin-bottom: 30px;
`
export const AcceptFormOuter = styled.form`
 display: flex;
 flex-direction: column;
 width: 100%;
`
export const AgentComment = styled.span`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 12px;
  color: #115B86;
  margin-top: 5px;
`
export const TextareaLabel = styled.div`
  width: 100%;
  text-align: left;
  color: #1b1b25;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-bottom: 9px;
`
export const FormTextarea = styled.textarea<{ error?: boolean }>`
  width: 100%;
    color: #3b3b41;
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
    height: 80px;
    border: ${({error}) => error ? '1px solid rgba(0, 0, 0, .4)' : '1px solid #bdbdbd'};
    border-radius: 4px;
    background-color: ${({error}) => error ? 'rgba(0, 0, 0, .06)' : 'white'};
    padding-top: 12px;
    padding-left: 10px;
    outline: none;
    
  &::placeholder {
    color: #bdbdbd;
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
  }
`
export const TimePicker = styled.input<{ error?: boolean, font_size?: string }>`
  width: 75px; 
  height: 40px; 
  background-color: ${({error}) => error ? 'rgba(0,0,0,.08)' : 'transparent'};
  border: ${({error}) => error ? '1px solid rgba(0, 0, 0, .45)' : '1px solid #bdbdbd'};
  border-radius: 4px; 
  font-family: 'Helvetica Light', sans-serif;
  font-size: ${({font_size}) => font_size ? font_size : 'inherit'};
 padding: 3px;
 margin-top: ${({error}) => error ? '-19px' : '24px'};
 outline: none;
 &:disabled {
  cursor: not-allowed;
  background-color: #ececec;
 }
`
export const AcceptPopupActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 35px;
`
export const AcceptDatesFilter = styled.div<{flex_direction?: string, max_width?: string}>`
  display: flex;
  flex-direction: ${({flex_direction}) => flex_direction ? flex_direction : 'row'};
  width: 100%;
  max-width: ${({max_width}) => max_width ? max_width : '100%'};
  justify-content: space-between;
  margin-bottom: 10px;
`
export const Wrapper = styled.div<{justify_content?: string, wrapper_width?: string}>`
  width: ${({wrapper_width}) => wrapper_width ? wrapper_width : '49%'};
  display: flex;
  align-items: center;
  justify-content: ${({justify_content}) => justify_content ? justify_content : 'flex-end'};
`
