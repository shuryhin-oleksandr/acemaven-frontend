import styled from 'styled-components'

type PropsStyle = {
    textColor?: string
    textTransform?: string
    textFont?: string
}

export const CalendarWrapper = styled.div<{error?: boolean}>`
  flex: none;
  margin-bottom: 10px;
  
  .DayPickerInput {
    width: 100%;
  }
   
   .DayPickerInput-Overlay {
    right: 0;
    left: auto;
   }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #1AB8E6 !important;
    color: white;
    border-radius: 0;
   
  }
  
  .DayPicker-Day {
    &:hover {
      background-color: rgba(26, 184, 230, .3) !important;
      color: #ffffff;
      border-radius: 0;
    }
  }
  
  .DayPicker-Day--disabled {
    &:hover {
      background-color: #ffffff !important;
      color: #999999;
    }
    color: #999999;
    opacity: .4;
  }
  
  .DayPicker-Day--start, .DayPicker-Day--end {
    background-color: rgba(26, 184, 230, 1) !important; 
    border-radius: 0;
    
    &:hover {
      border-radius: 0;
      opacity: .5;
       background-color: #1AB8E6 !important;
    }
  }
  
  
  input {
      padding: 10px;
  color: #828282;
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
  line-height: 17px;
  transition: 0.5s;
  width: 100%;
  height: 40px;
  border: ${({ error }) => (error ? "1px solid #7C7C89" : "1px solid #BDBDBD")};
  border-radius: 4px;
  outline: none;
  background: ${({ error }) => (error ? "#ECECEC" : "white")};

  &:focus {
    transition: 0.5s;
    border: 1px solid #7c7c89;
    background-color: white
  }

  &::placeholder {
    transition: 0.5s;
    color: #828282;
    font-size: 14px;
    font-family: "Helvetica Light", sans-serif;
    line-height: 17px;
  }
  &:focus::placeholder {
    opacity: 0;
    transition: 0.5s;
  }
  }

`

export const CalendarLabel = styled.div<PropsStyle>`
  font-family: ${({textFont}) => textFont ? textFont : 'Helvetica Reg, sans-serif'};
  font-size: 14px;
  line-height: 17px;
  color: ${({textColor}) => textColor ? textColor : '#1B1B25'};
  text-transform: ${({textTransform}) => textTransform ? textTransform : 'capitalize'};
  margin-bottom: 9px;
`

