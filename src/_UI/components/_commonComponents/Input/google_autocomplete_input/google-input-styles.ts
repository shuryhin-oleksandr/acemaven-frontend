import styled from 'styled-components'

export const GoogleInputOuter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 25px;
`
export const GoogleInputWrapper = styled.div<{error?: string}>`
 display: flex;
 width: 100%; 
 justify-content: space-between;
 
 input {
    width: 100%;
    max-width: 600px;
    height: 40px; 
    border: ${({error}) => error ? '1px solid #7C7C89;' : '1px solid #bdbdbd'}; 
    border-radius: 4px; 
    padding: 0 10px;
    outline: none;
    background-color: ${({error}) => error ? '#ececec' : 'white'};
 }
 
 img {
    &:hover {
      cursor: pointer;
    }
  }
`

export const LabelGoogleInput = styled.div<{color_label?: string, font_weight?: string, label_uppercase?: boolean}>`
  color: ${({color_label}) => color_label ? color_label : '#1b1b25'} ;
  font-family: ${({font_weight}) => font_weight ? font_weight : 'Helvetica Reg, sans-serif'};
  font-size: 14px;
  margin-bottom: 9px;
  text-transform: ${({label_uppercase}) => label_uppercase ? 'uppercase' : 'capitalize'};
`