import styled from 'styled-components'

type PropsStyle = {
    max_width?: string,
    w?: string,
    flex_direction?: string
}

export const ListWrap = styled.div`
display: flex;
width: 100%;
height: 100%;
max-width: 416px;
`

export const CardWrap = styled.div<PropsStyle>`
  max-width: ${({max_width}) => max_width ? max_width : '416px'};
  width: 100%;
 
  border: 1px solid #ECECEC;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
  position: relative;
  margin-bottom: 20px;
  min-height: 180px;
  
  &:hover {
    cursor: pointer;
  }
`
export const CardContent = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
width: 100%;
align-items: flex-start;
`
export const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
margin-bottom: 20px;
`
export const LineWrap = styled.div<PropsStyle>`
display: flex;
width: ${({w}) => w ? w : '90%'};
align-items: flex-end;
flex-direction: ${({flex_direction}) => flex_direction ? flex_direction : 'column'};
margin-bottom: 15px;
`
export const Label = styled.div`
font-family: 'Helvetica Reg', sans-serif;
font-size: 16px;
line-height: 17px;
color: #1B1B25;
margin-right: 10px;
display: flex;
text-align: end;
justify-content: flex-end;
`
export const Data = styled.div`
font-family: 'Helvetica Reg', sans-serif;
color: #4F4F4F;
font-size: 14px;
line-height: 16px;
`
export const DeleteButton = styled.button`
outline: none;
border: none;
background: none;
position: absolute;
right: 2%;
&:hover {
  cursor: pointer;
}
`

export const DefaultWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
   right: 15px;
   position: absolute;
   bottom: 15px;
`
export const DefaultText = styled.div`
color: #115B86;
font-family: "Helvetica Bold", sans-serif;
font-size: 14px;
`
export const DefaultIcon = styled.div`
  margin-right: 5px;
`
export const SetDefaultButton = styled.button`
  height: 35px;
  max-width: 160px;
  width: 100%;
  outline: none;
  background: none;
  border: 1px solid #3B3B41;
  color: #3B3B41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 13px;
  transition: .3s;
  text-transform: uppercase;
   &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0,0 ,0 , .07);
   }
`