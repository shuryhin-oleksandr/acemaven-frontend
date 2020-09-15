import styled from 'styled-components'

export const Container = styled.div`
background-color: white;
max-width: 427px;
width: 100%;
max-height: 105px;
height: 100%;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
display: flex;
`
export const Inner = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 100%;
padding: 20px 15px;
`
export const PhotoWrap = styled.div`
max-width: 70px;
width: 100%;
height: 100%;
display: flex;
border-radius: 50%;
border: 5px solid black;
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
`
export const Role = styled.div`
color: #828282;
margin-bottom: 5px;
`
export const Email = styled.div`
color: #828282;
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