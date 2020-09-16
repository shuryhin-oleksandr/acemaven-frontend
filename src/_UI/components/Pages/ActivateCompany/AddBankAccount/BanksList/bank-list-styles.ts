import styled from 'styled-components'

export const ListWrap = styled.div`
display: flex;
width: 100%;
height: 100%;
max-width: 416px;
`

export const CardWrap = styled.div`
  max-width: 416px;
  max-height: 175px;
  border: 1px solid #ECECEC;
  position: relative;
`
export const CardContent = styled.div`
padding: 15px;
display: flex;
flex-direction: column;
width: 100%;
align-items: flex-start;
`
export const LineWrap = styled.div`
display: flex;
width: 90%;
align-items: flex-end;
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
width: 27%;
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
`
export const DefaultText = styled.div`
color: #115B86;
font-family: "Helvetica Bold", sans-serif;
font-size: 14px;
`
export const DefaultIcon = styled.div`

`