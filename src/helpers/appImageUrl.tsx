
const ImgUrl = (src=process.env.REACT_APP_DEFAULT_IMG) => {
    let imgSrc = src;
    if(src) {
        if(!src.match(/^(http|https):\/\//))  {
            // match means this is legacy data 
            imgSrc = process.env.REACT_APP_API_ROOT + src;
        }    
    }
    return imgSrc;
}

export default ImgUrl;