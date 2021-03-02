import styled from 'styled-components'


export const ExamplesOuter = styled.div`
width: 100%;
height: 1209px;
background-color: white;
`
export const ExamplesInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

`

export const LeftMap = styled.div`
position: absolute;
bottom: 0;
left: 0;
`
export const LeftArrow = styled.div`
position: absolute;
bottom: 0;
left: 140px;
`
export const RightMap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
export const UpperArrow = styled.div`
position: absolute;
top: 80px;
right: 330px;

`
export const UnderArrow = styled.div`
position: absolute;
top: 391px;
right: 150px;
`
export const BlocksWrapper = styled.div`
position: absolute;
z-index: 0;
display: flex;
height: 100%;
width: 100%;
justify-content: center;
align-items: flex-start;
`

export const SearchBlock = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
max-width: 431px;
width: 100%;
z-index: 100;
margin-top: 132px;
`
export const BookBlock = styled(SearchBlock)`
margin-top: 286px;
margin-left: -60px;
`
export const SupportBlock = styled(SearchBlock)`
margin-top: 480px;
margin-left: -60px;
`
export const BlockTitle = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 24px;
  line-height: 28px;
  color: rgba(17, 91, 134, 1);
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
`
export const BlockSubTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`
export const ImageWrap = styled.div<{ height?: string, width?: string }>`
  border-radius: 7px;
  box-shadow: 0 0 15px rgba(0,0,0,0.25);
  img {
    width: ${({width}) => width ? width : '431px'};
    height: ${({height}) => height ? height : '330px'};
    border-radius: 7px;
  }
`