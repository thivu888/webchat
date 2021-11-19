

export const DownLoad = (url) =>{
    const link = document.createElement('a')
    link.href = url;
    const randomNumber = Math.floor(Math.random()*123456).toString()
    link.download = "file" + randomNumber
    link.click()
}

const GetUrlImg = async (url) => {

    const image = await fetch(url);
   
    const imageBlog = await image.blob()

    const imageURL = URL.createObjectURL(imageBlog)

    DownLoad(imageURL)

};
