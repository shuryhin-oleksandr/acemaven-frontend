export const getFilesFormData = (dataFromForm: any, photo: any) => {
  const formData = new FormData();
  !!photo && formData.append("photo", photo);
  Object.keys(dataFromForm).forEach((key) => {
    formData.append(key, dataFromForm[key]);
  });

  return formData;
};
