import styled from 'styled-components'
import fonts from "../../../../../theming/fonts";

export const ListEmpty = styled.div`
border: 1px dashed #828282;
height: 104px;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const UpperTitle = styled.div`
${fonts.archivoBlack(18, 20, 0, 400)};
color: #BDBDBD;
margin-bottom: 10px;
`
export const Subtitle = styled.div`
${fonts.asap(16, 18, 0, 400)};
color: #BDBDBD;
`