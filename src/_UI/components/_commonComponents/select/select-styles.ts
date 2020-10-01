import styled from 'styled-components'


export const SelectContainer = styled.div<PropsStyle>`
  width: 100%;
  max-width: ${({maxW}) => maxW ? maxW : '100%'};
`

type PropsStyle = {
    isFocus?: boolean,
    error?: string,
    maxW?: string
}

export const Select = styled.select<PropsStyle>`
  width: 100%;
  border: ${({error}) => error ? '1px solid #7C7C89' : '1px solid #BDBDBD'};
  background: ${({error}) => error ? '#ECECEC' : 'white'};
`
export const OptionWrap = styled.option`
  font-family: "Helvetica Light", sans-serif;
  color: #828282;
  height: 30px;
`