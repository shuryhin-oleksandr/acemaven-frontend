import styled from 'styled-components'


export const ChangeRequestWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  //background-color: rgba(0, 0, 0, .3);
  display: flex;
  align-items: baseline;
  justify-content: center;
`
export const ChangeRequestInner = styled.div`
  background-color: white;
  max-width: 1014px;
  width: 100%;
  padding: 50px;
  margin-top: 50px;
  position: relative;
`
export const ChangeRequestContent = styled.div`
  display: flex;
  flex-direction: column;
`
export const ChangeRequestTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  line-height: 21px;
  color: #1B1B25;
  margin-bottom: 28px;
`
export const ChangedInfoBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const InfoBlockOuter = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #BDBDBD;
  padding-bottom: 37px;
  margin-bottom: 23px;
`
export const InfoBlockInner = styled.div`
  display: flex;
  
  justify-content: flex-start;
`
export const InfoBlockContent = styled.div<{ flex_direction?: string}>`
  display: flex;
  flex-direction: ${({flex_direction}) => flex_direction ? flex_direction : 'row'};
`
export const ValuesWrapper = styled.div<{margin_right?: string, back_color?: string}>`
  display: flex;
  padding: 8px;
  flex-direction: column;
  margin-right: ${({margin_right}) => margin_right ? margin_right : '20px'};
  background-color: ${({back_color}) => back_color ? back_color : 'white'};
`
export const InfoBlockLabel = styled.div<{font_color?: string}>`
  font-family: 'Helvetica Bold', sans-serif;
  color: ${({font_color}) => font_color ? font_color : '#3B3B41'};
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
`
export const InfoBlockValue = styled.div<{font_color?: string, font_size?: string}>`
  font-family: 'Helvetica Light', sans-serif;
  color: ${({font_color}) => font_color ? font_color : '#3B3B41'};
  font-size: ${({font_size}) => font_size ? font_size : '14px'};
`
export const ShippingModeValue = styled.div`
  font-family: 'Helvetica Bold', sans-serif;
  color: #3B3B41;
  font-size: 14px;
  margin-bottom: 14px;
`
export const FormChangeRequestWrapper = styled.form`
  display: flex;
  flex-direction: column;
`
export const FormChangeRequestTitle = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  color: black;
  font-size: 18px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`
export const FormChangeRequestInner = styled.div`
  
`
export  const ChangeRequestButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export  const ConfirmRequestButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 145px;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  border: 1px solid #3B3B41;
  outline: none;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`
export  const CancelRequestButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 145px;
  background-color: white;
  color: #3B3B41;
  border: 1px solid #3B3B41;
  outline: none;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  transition: .3s;
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`
