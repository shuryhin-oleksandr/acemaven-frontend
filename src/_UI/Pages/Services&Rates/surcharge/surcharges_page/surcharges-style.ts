import styled from 'styled-components'

export const Outer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
export const CellWrap = styled.div`
  width: 100%;
  display: flex;
  height: 77px;
 
`
export const ModeIcon = styled.img`
  position: absolute;
  left: 0;
  top: 22%;
`

export const SpanMode = styled.div`
transition: .3s;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    transition: .3s;
  }
`