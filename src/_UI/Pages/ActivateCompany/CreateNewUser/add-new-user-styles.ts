import styled from 'styled-components'

export const AddContainer = styled.div`
display: flex;
height: 100%;
width: 100%;
flex-direction: column;
padding: 60px 80px 60px 130px;
`

export const ContentWrap = styled.div`
max-height: 595px;
height: 100%;
width: 100%;
margin-bottom: 50px;
display: flex;
justify-content: space-between;

`

export const NavigationWrap = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
margin-top: 40px;
`
export const CancelButton = styled.button`
background: white;
outline: none;
border: 1px solid #3B3B41;
min-height: 40px;
max-width: 115px;
width: 100%;

&:hover {
cursor: pointer
}
`
