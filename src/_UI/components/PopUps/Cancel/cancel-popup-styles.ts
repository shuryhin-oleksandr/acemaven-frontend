import styled from 'styled-components'

export const PopupContainer = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: rgba(0, 0, 0, .3);
display: flex;
align-items: center;
justify-content: center;
z-index: 600;
`

export const PopupContent = styled.div`
background-color: white;
max-width: 800px;
max-height: 400px;
width: 100%;
height: 100%;
`
export const CancelTitle = styled.div`
color: black;
`
export const ButtonsWrap = styled.div`
width: 100%;  
display: flex;
justify-content: space-between;
`