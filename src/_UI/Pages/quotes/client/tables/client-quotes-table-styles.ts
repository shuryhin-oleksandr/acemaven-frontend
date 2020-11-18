import styled from 'styled-components'

type PropsStyle = {
    status?: boolean,
    new_offer?: boolean
}

export const QuotesTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
export const QuotesTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 33px;
`
export const HeaderTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  line-height: 57.26px;
  color: black;
`
export const StatusSpan = styled.div<PropsStyle>`
  color: #115b86;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
`
export const OffersSpan = styled.div<PropsStyle>`
   font-family: ${({new_offer}) => new_offer ? "Helvetica Bold" : "Helvetica Light"};
    font-size: 18px;
    color: ${({new_offer}) => new_offer ? "#115b86" : "black"};
`
