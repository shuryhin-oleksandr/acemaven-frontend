export const getFilesFormData = ( dataFromForm: any, photo:any ) => {
    const formData = new FormData()
    formData.append('photo', photo ? photo : '')
    Object.keys(dataFromForm).forEach(key => {
        formData.append(key, dataFromForm[key])
    })

    return formData;
}