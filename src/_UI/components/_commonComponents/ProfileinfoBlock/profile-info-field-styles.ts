import styled from 'styled-components'



export const Outer = styled.div`
display: flex;
max-width: 400px;
width: 100%;
height: 100%;
justify-content: space-between;
margin-left: 30px;
`

export const Info = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 380px;
`
export const FieldWrap = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 45px;
margin-bottom: 27px;
`
export const Label = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`

export const TextWrap = styled.div`
  color: #1B1B25;
  font-family: "Helvetica Light", sans-serif;
  font-size: 16px;
`
export const SpanName = styled.div`
   color: #1B1B25;
  font-family: "Helvetica Light", sans-serif;
  font-size: 16px;
  text-transform: capitalize;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`