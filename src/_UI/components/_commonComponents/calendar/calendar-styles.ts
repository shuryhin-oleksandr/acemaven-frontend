import styled from 'styled-components'

type PropsStyle = {
    textColor?: string
    textTransform?: string
    textFont?: string
    display_label?: string
    max_width?: string
    margin_bottom?: string
    input_height?: string
}

export const CalendarWrapper = styled.div<{error?: boolean, max_width?: string, margin_bottom?: string, input_height?: string}>`
  flex: none;
  margin-bottom: ${({margin_bottom}) => margin_bottom ? margin_bottom : '10px'};
  width: 100%;
  
  .DayPickerInput {
    width: 100%;
    max-width: ${({max_width}) => max_width ? max_width : '420px'};
    height:${({input_height}) => input_height ? input_height : '40px'};
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
  height: 100%;
  width: 100%;
  border: ${({ error }) => (error ? "1px solid #7C7C89" : "1px solid #BDBDBD")};
  border-radius: 4px;
  outline: none;
  background: ${({ error }) => (error ? "#ECECEC" : "white")};

  &:hover {
    cursor: pointer;
  }
  &:focus {
    transition: 0.5s;
    border: 1px solid #7c7c89;
    background-color: white
  }

  &:disabled {
  background-color: rgba(0, 0, 0, .1);
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
  display: ${({display_label}) => display_label ? display_label : 'block'}
`

