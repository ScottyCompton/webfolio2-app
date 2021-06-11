import ImageWithPreloader from './ImageWithPreloader';

const GalleryTile = (props) => {
    const {handleClick, src, idx, auxImgAspectRatio} = props;
    console.log(auxImgAspectRatio)
    const doHandleClick = (e) => {
        handleClick(e,idx);
    }


    return (                                                
        <div onClick={doHandleClick} className="Portfolio-Item__Gallery-Img">
            <div><ImageWithPreloader style={{paddingTop: `${auxImgAspectRatio}%`}} src={src} className="Portfolio-Item__img-preloader" /></div>
        </div>
    )
}

export default GalleryTile;
