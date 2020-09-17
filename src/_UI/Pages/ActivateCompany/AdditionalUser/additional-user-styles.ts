import styled from 'styled-components'

export const Wrapper = styled.div`
width: 100%;

height: 100vh;
display: flex;
justify-content: center;
`
export const Inner = styled.div`
max-width: 600px;
width: 100%;
height: 100%;
box-shadow: -5px 0 10px 0 #E5E5E5, 5px 0 10px 0 #E5E5E5;
background-color: white;
padding: 90px;
`

export const Title = styled.div`
font-family: "Helvetica Bold", sans-serif;
font-size: 28px;
color: #1B1B25;
margin-bottom: 50px;
`
export const FormContainer = styled.form`
max-width: 420px;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`
export const FullfilledWrap = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 27px;
`
export const LineWrap = styled.div`
width: 100%;
height: 1px;
background-color: #E0E0E0;
`
export const FillOuter = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
max-width: 190px;
width: 100%;

`
export const Label = styled.div`
margin-bottom: 10px;
font-family: "Helvetica Bold", sans-serif;
color: black;
font-size: 14px;
`
export const TextWrap = styled.div`
color: #1B1B25;
font-family: "Helvetica Light", sans-serif;
font-size: 16px;
`