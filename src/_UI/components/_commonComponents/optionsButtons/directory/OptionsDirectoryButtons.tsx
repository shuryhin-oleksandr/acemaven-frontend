import React from 'react';
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

import {filterByThunk} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {OptionButtonExport, OptionButtonImport, OptionsButtonsWrap} from "./options-directory-styles";


type PropsType = {
    setDirectory?: VoidFunctionType,
    directory?: string,
    dispatch?: VoidFunctionType,
    mode: string,
    searchColumn: string,
    searchValue: string
}

const OptionsDirectoryButtons:React.FC<PropsType> = ({directory, setDirectory, ...props}) => {

    let dispatchDirectoryHandler = (directory: string) => {
        setDirectory && setDirectory(directory)
        props.dispatch && props.dispatch(filterByThunk(directory, props.mode, '', props.searchColumn, props.searchValue))
    }

    return (
        <OptionsButtonsWrap>
            <OptionButtonImport onClick={() => dispatchDirectoryHandler('import')} directory={directory}>
                Import
            </OptionButtonImport>
            <OptionButtonExport onClick={() => dispatchDirectoryHandler('export')} directory={directory}>
                Export
            </OptionButtonExport>

        </OptionsButtonsWrap>
    )
}

export default OptionsDirectoryButtons

