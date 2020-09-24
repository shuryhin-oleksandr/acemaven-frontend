import styled from 'styled-components'

export const EditCardContainer = styled.div`
  max-width: 452px;
  width: 100%;
  border: 2px solid #7C7C89;
`
export const FormContainer = styled.form`
  width: 100%;
  padding: 30px 70px 30px 100px;
  position: relative;
`
export const PhotoWrap = styled.div`
display: flex;
position: absolute;
border: 3px solid #1AB8E6;
border-radius: 50%;
left: 4%;
top: 5%;
  img {
    border-radius: 50%;
    width: 64px;
    height: 64px;
  }
`