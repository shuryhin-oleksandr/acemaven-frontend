// Core
import React from "react";
import Back from "../../../assets/icons/back-button.svg";

const BaseBackButton = ({ onClick }) => {
  return <img src={Back} alt="back" fill="#FFFFFF" onClick={onClick} />;
};

export default BaseBackButton;
