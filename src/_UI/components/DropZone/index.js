import React, { useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Icon from "../../assets/icons/drop-zone-icon.svg";
import {useTranslation} from "react-i18next";

const DropZone = ({ setImg, name, setFile }) => {


  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    const reader = new FileReader();
    reader.onload = function (e) {
      setImg(e.target.result);
      setFile(acceptedFiles[0])
    };
    setImg(reader.readAsDataURL(acceptedFiles[0]));
  }, [setFile, setImg]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });
const {t} = useTranslation();
 return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <img src={Icon} alt="Icon" />
        <input  name={name} {...getInputProps()}  type='file' accept='.jpg, .svg, .jpeg, .png'/>
        <p style = {{fontFamily: 'Helvetica Reg', fontSize: '14px', whiteSpace: 'nowrap'}}>{t("Complete Profile/Drop photo here or select photo")}</p>
      </Container>
    </div>
  );
};

export default DropZone;

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  border: 1px dashed #b7bcd6;
  border-radius: 4px;
  background-color: #ffffff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  user-select: none;
`;
