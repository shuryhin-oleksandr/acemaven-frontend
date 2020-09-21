import styled from 'styled-components'

export const SpinnerContainer = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
z-index: 100;
`

export const SpinnerContent = styled.div`
  img {
    width: 100px;
  }
`