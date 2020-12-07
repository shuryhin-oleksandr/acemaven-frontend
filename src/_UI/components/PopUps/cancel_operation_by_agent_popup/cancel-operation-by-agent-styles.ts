import styled from 'styled-components'
import {CompleteSubtitle, CompleteTitle } from '../complete_operation_by_agent/complete-operation-styles'


export const CancelOperationByAgentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const CancelOperationByAgentInner = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  position: relative;
`
export const CancelOperationByAgentContent = styled.form`
  padding: 60px 99px;
  display: flex;
  flex-direction: column;
`
export const CancelOperationTitle = styled(CompleteTitle)``

export const CancelOperationSubtitle = styled(CompleteSubtitle)``

export const AwareOuter = styled.div`
  margin-right: 23px;
`