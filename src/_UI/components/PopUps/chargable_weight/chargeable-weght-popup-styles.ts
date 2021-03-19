import styled from 'styled-components'


export const ChargeableWeightOuter = styled.form`
  padding-top: 100px;
  padding-bottom: 100px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ChargeableWeightInner = styled.div`
  padding: 40px 80px;
  width: 100%;
  max-width: 672px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
`
export const CloseIcon = styled.button`
  position: absolute;
  outline: none;
  border: none;
  background: none;
  
  top: 20px;
  right: 20px;
  img {
    width: 10.5px;
    height: 10.5px;
  }
  &:hover {
    cursor: pointer;
  }
`

export const CargoTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  color: #1b1b25;
  font-size: 18px;
  line-height: 20px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
`
export const CalculationWrapper = styled.div`
  width: 100%;
  
  
`
export const FormRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0 0;
`
export const ButtonsCalcWrapper = styled.div`
  width: 100%;
`
export const WeightWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`
export const WeightIcon = styled.div`
  margin-right: 9px;
  display: flex;
  padding-top: 15px;
`
export const CheckboxWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid #7C7C89;
  padding: 14px 0;
  margin-bottom: 30px;
`

export const TotalWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-family: "Helvetica Light", sans-serif;
  color: black;
  font-size: 16px;
  margin-top: 13px;
  margin-bottom: 15px;
`
export const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  height: 40px;
  width: 144px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`
export const CancelButton = styled(ConfirmButton)`
 background: none;
 border: 1px solid #1b1b25;
 color: #1b1b25;
 margin-right: 0;
 transition: .3s;
 
 &:hover {
  cursor:pointer;
  transition: .3s;
  background-color: rgba(0, 0, 0, .07);
 }
`
export const NewPackageWrapper = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
`

export const AddNewPackageButton = styled.button`
  outline: none;
  border: none;
  height: 25px;
  width: 25px;
  background:none;
  
  margin-bottom: 25px;
  
  &:hover {
    cursor: pointer;
  }
`

