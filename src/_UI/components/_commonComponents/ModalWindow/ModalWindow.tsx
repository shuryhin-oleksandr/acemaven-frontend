import React from "react";
//react-modal
import Modal from "react-modal";
//react-custom-scrollbars
import {Scrollbars} from "react-custom-scrollbars";

type PropsType = {
  isOpen: boolean,
}

const ModalWindow:React.FC<PropsType> = ({children, isOpen}) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          inset: "unset",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "rgba(0, 0, 0, .0)",
          border: "unset",
          padding: 0,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, .3)"
        }
      }}
    >
      <Scrollbars>
        {children}
      </Scrollbars>
    </Modal>
  )
}

export default ModalWindow;