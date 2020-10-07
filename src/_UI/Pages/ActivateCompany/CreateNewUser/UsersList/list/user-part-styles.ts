import styled from 'styled-components'

type PropsStyle = {
    max_width?: string,
    role?: string,
    colorette?: string
}

export const Container = styled.div<PropsStyle>`
background-color: white;
max-width: ${({max_width}) => max_width ? max_width : '427px'};
min-width: 427px;
width: 100%;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
display: flex;
margin-bottom: 19px;

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
width: 75px;
height: 76px;
display: flex;
border-radius: 50%;
border-top: 3px solid ${({colorette}) => colorette ? colorette : '#1AB8E6'};
border-left: 3px solid ${({colorette}) => colorette ? colorette : '#1AB8E6'};
border-right: 3px solid ${({colorette}) => colorette ? colorette : '#115B86'};
border-bottom: 3px solid ${({colorette}) => colorette ? colorette : '#115B86'};
transform: rotate(-45deg);
img {
width: 69px;
height: 70px;
border-radius: 50%;
z-index: 50;
transform: rotate(45deg);
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