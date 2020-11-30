import styled from 'styled-components'


export const RejectWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 0;
`
export const RejectInner = styled.div`
  max-width: 800px;
  width: 100%;
  height: 420px;
 background-color: white;
 position: relative;
`
export const RejectContent = styled.form`
  padding: 60px 99px;
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const RejectTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  line-height: 21px;
  color: black;
  margin-bottom: 28.5px;
  text-align: center;
`
export const RejectAware = styled.div`
  margin-bottom: 27.5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  
   img {
    margin-right: 9.5px;
   }
   span {
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
    line-height: 18px;
    color: #1b1b25;
   }
`
export const RejectLabel = styled.div`
  width: 100%;
  text-align: left;
  color: black;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  margin-bottom: 9px;
`
export const RejectTextarea = styled.textarea<{error: boolean}>`
    width: 100%;
    color: #3b3b41;
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
    height: 80px;
    border: ${({error}) => error ? '1px solid rgba(0, 0, 0, .4)' : '1px solid #bdbdbd'};
    background-color: ${({error}) => error ? 'rgba(0, 0, 0, .06)' : 'white'};
    padding-top: 12px;
    padding-left: 10px;
    outline-color: rgba(0, 0, 0, .2);
    
  &::placeholder {
    color: #bdbdbd;
    font-family: "Helvetica Light", sans-serif;
    font-size: 14px;
  }
`
export const RejectActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
export const RejectConfirmButton = styled.button`
  height: 40px;
  width: 150px;
  margin-right: 15px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`
export const RejectCancelButton = styled.button`
  height: 40px;
  width: 140px;
  outline: none;
  border: 1px solid #3b3b41;
  background-color: transparent;
  color: #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`