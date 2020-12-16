import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const CompanySettingsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: ${skelet_appear} ease-in-out .4s;
`
export const CompanyInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const PageTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
  width: 100%;
  display: flex;
  padding: 51px 50px 32px 30px;
`