import React from 'react'
import {OptionsButtonsWrap} from "../../../../Pages/Services&Rates/surcharge/register_new_surcharge/form-styles";
import {useDispatch} from "react-redux";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import styled from "styled-components";
import {getAgentsOperationsThunk} from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {CurrentShippingType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";


type PropsType = {
    setMode?: (value: CurrentShippingType) => void;
    mode: string;
    dispatch?: VoidFunctionType;
    directory: string;
    searchColumn: string;
    searchValue: string;
    setShippingValue?: (shippingModeId: number) => void;
    disabled?: boolean;
    thunkName?: string;
    my_operations: string,
    setMyOperations: (value: string) => void
}

const OptionsOperationButtons:React.FC<PropsType> = ({setMode, mode, ...props}) => {

    const dispatch = useDispatch()

    let dispatchOperationsHandler = (belong_to_mine: string) => {
       belong_to_mine === 'mine' ? props.setMyOperations('mine') : props.setMyOperations('all')
        //props.setShippingValue && props.setShippingValue(0);
        belong_to_mine === 'mine' ? dispatch(getAgentsOperationsThunk(true)) : dispatch(getAgentsOperationsThunk(''))
    };

    return (
        <OptionsButtonsWrap>
            <OptionMineButton
                onClick={() => {
                    dispatchOperationsHandler(
                        'mine'
                    );
                }}
                belong_to={props.my_operations}
            >
                My
            </OptionMineButton>
            <OptionAllButton
                onClick={() => {
                     dispatchOperationsHandler('all');
                }}
               belong_to={props.my_operations}
            >
               All
            </OptionAllButton>
        </OptionsButtonsWrap>
    )
}

export default OptionsOperationButtons

const OptionMineButton = styled.div<{belong_to?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  max-width: 68px;
  height: 32px;
  background-color: ${({ belong_to }) =>
    belong_to === "mine" ? "#1AB8E5" : "transparent"};
  border-radius: 2px;
  box-shadow: ${({ belong_to }) =>
    belong_to === "mine" && "1px 1px 4px rgba(0, 0, 0, 0.25)"};
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;
  color: ${({ belong_to }) => belong_to === "mine" ? "white" : "black"};
  

  &:hover {
    cursor: pointer;
  }
`;
export const OptionAllButton = styled.div<{belong_to?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  max-width: 68px;
  height: 32px;
  background-color: ${({ belong_to }) =>
    belong_to === "all" ? "#1AB8E5" : "transparent"};
  border-radius: 2px;
  box-shadow: ${({ belong_to }) =>
    belong_to === "all" && "1px 1px 4px rgba(0, 0, 0, 0.25)"};
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;
  color: ${({ belong_to }) => belong_to === "all" ? "white" : "black"};

  &:hover {
    cursor: pointer;
  }
`;
