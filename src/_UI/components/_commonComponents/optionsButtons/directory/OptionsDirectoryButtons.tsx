import React from 'react';
import {filterByThunk} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {OptionButtonExport, OptionButtonImport, OptionsButtonsWrap} from "./options-directory-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    setDirectory?: (value: string) => void,
    directory?: string,
    dispatch?: any,
    mode: string,
    searchColumn: string,
    searchValue: string,
    margin_bottom?: string
}

const OptionsDirectoryButtons:React.FC<PropsType> = ({directory, setDirectory, ...props}) => {

    let dispatchDirectoryHandler = (directory: string) => {
        setDirectory && setDirectory(directory)
        props.dispatch && props.dispatch(filterByThunk(directory, props.mode, '', props.searchColumn, props.searchValue))
    }
  const {t} = useTranslation();
    return (
        <OptionsButtonsWrap margin_bottom={props.margin_bottom}>
            <OptionButtonImport onClick={() => dispatchDirectoryHandler('import')} directory={directory}>
              {t("Surcharges/Import")}
            </OptionButtonImport>
            <OptionButtonExport onClick={() => dispatchDirectoryHandler('export')} directory={directory}>
              {t("Surcharges/Export")}
            </OptionButtonExport>

        </OptionsButtonsWrap>
    )
}

export default OptionsDirectoryButtons

