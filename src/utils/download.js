

export const DownLoad = (url,name) =>{
    const link = document.createElement('a')
    link.href = url;
    link.download = name
    link.click()
}

export const GetUrlImg = async (url) => {

    const image = await fetch(url);
    let name = await image.url.split('/')
    name = image.url.split('_')
    delete name[0]
    name = name.join("")
    name = name.replace(/%20/g, "_")
    const imageBlog = await image.blob()

    const imageURL = URL.createObjectURL(imageBlog)
    DownLoad(imageURL,name)

};
