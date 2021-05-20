import styled from "styled-components";

export const HiddenOuter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
`
export const DocumentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px 0 28px;
  border-bottom: 1px solid #bdbdbd;
`
export const DocumentsContent = styled.div`
  padding-top: 17px;
   position: relative;
`
export const ActionsInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
 
`
export const InfoBlock = styled.div`
  display: flex;
  justify-content: flex-start;
`
export const CargoWrapper = styled(DocumentsWrapper)`
  
`
export const ShippingModeBlock = styled.div`
  width: 100%;
`
export const ShippingModeLabel = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 15px;
`
export const ChargesWrapper = styled(CargoWrapper)``