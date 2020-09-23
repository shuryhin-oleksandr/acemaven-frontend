import styled from 'styled-components'
import {IAddNewUserData} from "../../../../../../_BLL/types/addNewUserTypes";

type PropsStyle = {
    max_width?: string,
    role?: string,
    roles?: IAddNewUserData
}

export const Container = styled.div<PropsStyle>`
background-color: white;
max-width: ${({max_width}) => max_width ? max_width : '427px'};
width: 100%;
max-height: 105px;
height: 100%;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
display: flex;
margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
`
export const Inner = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 100%;
padding: 20px 10px;
`
export const PhotoWrap = styled.div<PropsStyle>`
max-width: 70px;
width: 100%;
height: 100%;
display: flex;
border-radius: 50%;
/*border: ${({roles}) => (
    roles?.roles?.map(r => (r === 'master') ? '3px solid black' : (r === 'agent') ? '3px solid #115B86' : '3px solid #1AB8E6')  
)}
    */
img {
width: 64px;
z-index: 50;
}
`
export const InfoWrap = styled.div`
display: flex;
width: 80%;
flex-direction: column;
justify-content: center;
`
export const Name = styled.div`
margin-bottom: 5px;
font-family: "Helvetica Bold", sans-serif;
font-size: 16px;
color: black;
`
export const Role = styled.div`
color: #828282;
margin-bottom: 5px;
font-family: "Helvetica Light", sans-serif;
font-size: 14px;
display: flex;
`
export const Email = styled.div`
color: #828282;
font-family: "Helvetica Light", sans-serif;
font-size: 14px;
display: flex;

`
export const ActionWrap = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: flex-start;
`
export const DeleteButton = styled.button`
outline: none;
background: none;
border: none;
&:hover {
cursor: pointer;
}
`
export const EditButton = styled.button`
outline: none;
background: none;
border: none;
&:hover {
cursor: pointer;
}
`

export const SpanName = styled.div<PropsStyle>`
  font-family: "Helvetica Bold", sans-serif;
  text-transform: capitalize;
  font-size: 14px;
  margin-left: 5px;
  color: ${({role}) => (role === 'agent') ? '#115B86' : (role === 'billing') ? '#1AB8E6' : 'black'}
`
export const SpanEmail = styled.div`
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
  color: rgba(0, 0, 0, .8);
  margin-left: 5px;
`