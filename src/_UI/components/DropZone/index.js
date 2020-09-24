import React, { useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Icon from "../../assets/icons/drop-zone-icon.svg";

const DropZone = ({ setImg, name }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setImg(e.target.result);
    };
    console.log(acceptedFiles[0])
    setImg(reader.readAsDataURL(acceptedFiles[0]));
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
        <input  name={name} {...getInputProps()}  type='file' accept='.jpg, .svg, .jpeg, .png'/>
        <p style = {{fontFamily: 'Helvetica Reg', fontSize: '14px'}}>Drop photo here or select photo</p>
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
