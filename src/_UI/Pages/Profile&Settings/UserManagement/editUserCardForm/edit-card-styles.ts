import styled from 'styled-components'

type PropsStyle = {
    colorette?: string,
    isOpenPopup?: boolean
}

export const EditCardContainer = styled.div`
  max-width: 452px;
  width: 100%;
  border: 2px solid #7C7C89;
`
export const FormContainer = styled.form<PropsStyle>`
  width: 100%;
  padding:${({isOpenPopup}) => isOpenPopup ? '30px 50px 30px 50px' : '30px 70px 30px 100px'};
  position: relative;
`
export const PhotoWrap = styled.div<PropsStyle>`
display: flex;
position: absolute;
border-top: 3px solid ${({colorette}) => colorette ? colorette : '#1AB8E6'};
border-left: 3px solid ${({colorette}) => colorette ? colorette : '#1AB8E6'};
border-right: 3px solid ${({colorette}) => colorette ? colorette : '#115B86'};
border-bottom: 3px solid ${({colorette}) => colorette ? colorette : '#115B86'};
transform: rotate(-45deg);
border-radius: 50%;
left: 4%;
top: 5%;
  img {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    transform: rotate(45deg);
  }
`

export const Label = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`