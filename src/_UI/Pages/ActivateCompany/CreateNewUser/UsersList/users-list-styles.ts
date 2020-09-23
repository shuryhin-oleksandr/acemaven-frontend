import styled from 'styled-components'


export const ListContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
max-width: 427px;

`

export const ListInner = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
overflow-y: scroll;
max-height: 565px;
::-webkit-scrollbar { /* chrome based */
          width: 0; /* ширина scrollbar'a */
          background: transparent; /* опционально */
        }
        -ms-overflow-style: none; /* IE 10+ */
        scrollbar-width: none; /* Firefox */
`
