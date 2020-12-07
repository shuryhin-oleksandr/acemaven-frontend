import styled from "styled-components";
import air_mode from '../../../../../_UI/assets/icons/landing/air_mode.png'
import ship_mode from '../../../../../_UI/assets/icons/landing/ship_mode.png'

type PropsStyle = {
    back?:  string,
    direction?: string
}

export const ModesWrapper = styled.div`
  width: 100%;
  background-color: #e8e8e8;
`
export const ModesInner = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding: 90px 100px;
`
export const Mode = styled.div<PropsStyle>`
display: flex;
align-items: center;
flex-direction: ${({direction}) => direction ? direction : 'row'};
position: relative;

`
export const AirModeImage = styled.div`
background-image: url(${air_mode});
min-width: 848px;
max-width: 848px;
height: 345px;
margin-bottom: 30px;

`
export const ShipModeImage = styled.div`
background-image: url(${ship_mode});
min-width: 848px;
max-width: 848px;
height: 345px;
margin-top: 30px;
margin-left: 23px;
margin-right: -5px;

`
export const Block = styled.div<PropsStyle>`
display:flex;
flex-direction: column;
align-items: center;
padding: 90px 50px 60px;
  max-width: 450px;
  min-width: 450px;
  width: 100%;
  height: 578px;
  background-color: ${({back}) => back ? back : '#1B1B25'};
`
export const MarineTitle = styled.div`
color: white;
font-size: 48px;
line-height: 57.26px;
font-family: "Helvetica Bold", sans-serif;
text-transform: uppercase;
text-align: end;
max-width: 416px;
min-width: 416px;
width: 100%;
margin-right: 340px;
`
export const AirTitle = styled(MarineTitle)`
max-width: 396px;
min-width: 396px;
width: 100%;
text-align: start;
margin-left: 340px;
margin-right: 0;
`
export const Description = styled.div`
color: white;
font-size: 24px;
line-height: 28.27px;
font-family: "Helvetica Light", sans-serif;
text-align: start;
max-width: 349px;
width: 100%;
margin-bottom: 46px;
`