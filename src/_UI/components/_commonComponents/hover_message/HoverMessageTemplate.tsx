import React from "react";

import template_icon from "../../../assets/icons/rates&services/template.svg";
import { TemplateIcon, TemplateWrap } from "./hover-message-styles";
import {useTranslation} from "react-i18next";

const HoverMessageTemplate = () => {
  const {t} = useTranslation();
  return (
    <TemplateWrap>

      <div className="template-message">
        {/*<div className='arrow'>
                     <img src={pyramid} alt=""/>
                </div>*/}
        <div className="message">
          {t("Freight rates/Use this registry as a template for a new rate, with the same values and parameters")}
        </div>
      </div>
    </TemplateWrap>
  );
};

export default HoverMessageTemplate;
