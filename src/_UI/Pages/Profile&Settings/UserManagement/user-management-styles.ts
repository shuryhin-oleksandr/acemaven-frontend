import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const ManagementContainer = styled.div`
  width: 100%;
  height: 100%;
  animation: ${skelet_appear} ease-in-out .4s;
`
export const ManagementInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 80px 30px 30px;
`
export const ManagTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px; 
  color: black;
  margin-bottom: 35px;
`
export const CardsOuter = styled.div<{editMode?: boolean}>`
  max-width: 922px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  max-height: ${({editMode}) => editMode ? '700px' : '395px'};
  // overflow-y: auto;
  ::-webkit-scrollbar { /* chrome based */
          width: 5px; /* ширина scrollbar'a */
          border-radius: 5px;
          background: #115B86; /* опционально */
      
        }
      
        
        
   
`
