import styled from 'styled-components'

export const ProfileOuter = styled.div`
  width: 100%;
  height: 100%;
`
export const ProfileInner =styled.div`
  width: 100%;
  height: 100%;
  padding: 51px 75px 51px 30px;
  display: flex;
  flex-direction: column;
`

export const HeaderWrap = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin-bottom: 22px;
`
export const ProfileTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
`
export const EditButton = styled.button`
outline: none;
background: none;
border: none;
  &:hover {
    cursor: pointer;
  }
`
export const ProfileContent = styled.div`
display: flex;
width: 100%;
justify-content: flex-start;
max-height: 185px;
height: 100%;
`

export const PhotoWrap = styled.div`
  img {
    width: 185px;
    height: 185px;
  }
`

