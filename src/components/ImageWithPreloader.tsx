import React from 'react';
import PreloadImage from './PreloadImage';
import {ImageWithPreloaderProps} from '../interfaces';


const ImageWithPreloader:React.FC<ImageWithPreloaderProps> = (props) => {
    const {src, style, className = 'img-peloader', duration = '1000ms' } = props;
    return (
        <PreloadImage 
            src={src}
            className={className}
            style={style}
            duration={duration}
            lazy
        />
    )

}

export default ImageWithPreloader;

