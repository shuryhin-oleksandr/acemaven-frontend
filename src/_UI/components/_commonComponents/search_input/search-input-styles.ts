import styled from 'styled-components'

export const SearchWrap = styled.div`
display: flex;
align-items: center;
height: 36px;
max-width: 166px;
width: 100%;
position: relative;
margin-bottom: 10px;
`
export const SearchField = styled.input`
width: 100%;
height: 100%;
outline: none;
background-color: white;
border: 1px solid #BDBDBD;
border-radius: 4px;
padding-left: 5px;
`

export const SearchIcon = styled.button`
  position: absolute;
  right: 12px;
  outline: none;
  border: none;
  background: none;
  padding: 0;
  
  &:hover {
    cursor: pointer;
  }
`