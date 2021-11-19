import HttpRequest from '../utils/http-request'



export default {
    uploadFile (file,type) { 
        // khi co api

        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("file_type", type);
        // return HttpRequest.post(url, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // }).then(response => response).catch(er => console.log(er));

        // test

        const url = URL.createObjectURL(file)
        
        return {file,url}

    },
};
