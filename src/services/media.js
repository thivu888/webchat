import HttpRequest from '../utils/http-request'



const Media = {
    uploadFile (file,type) { 
        const formData = new FormData();
        formData.append("file", file);
        formData.append("file_type", type);
        return HttpRequest.post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response).catch(er => console.log(er));
    },
};

export default  Media