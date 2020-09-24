import styled from 'styled-components'


export const ListContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
max-width: 427px;
max-height: 478px;
overflow-y: scroll;
::-webkit-scrollbar { /* chrome based */
          width: 5px; /* ширина scrollbar'a */
         
         border-radius: 5px;
          background: #115B86; /* опционально */
        }
        
`

export const ListInner = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;

max-height: 565px;
overflow-y: scroll;
::-webkit-scrollbar { /* chrome based */
          width: 0; /* ширина scrollbar'a */
          background: transparent; /* опционально */
        }
        -ms-overflow-style: none; /* IE 10+ */
        scrollbar-width: none; /* Firefox */
`
