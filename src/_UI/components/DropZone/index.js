import React, { useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Icon from "../../assets/icons/drop-zone-icon.svg";

const DropZone = ({ setImg }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setImg(e.target.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <img src={Icon} alt="Icon" />
        <input {...getInputProps()} />
        <p>Drop photo here or select photo</p>
      </Container>
    </div>
  );
};

export default DropZone;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
  border: 1px dashed #b7bcd6;
  border-radius: 4px;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  user-select: none;
`;
