import styled from 'styled-components'


export const LayoutContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
min-height: 100vh;
height: 100%;
position: relative;
@media (max-width: 1400px){
  min-height: calc(100vh - 15px);
}
`

export const Content = styled.div`
display: flex;
flex:1;
width: 100%;
min-height: calc(100vh - 60px);
`