import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {SliderArrowProps} from '../interfaces';

const SliderArrow:React.FC<SliderArrowProps> = (props) => {
    const {onClick, type, className} = props;
    return (
        <div onClick={onClick} className={`portfolio-slider-arrow ${className}`}>
            {type === 'next' && <FontAwesomeIcon size="3x" icon={faChevronRight} />} 
            {type === 'prev' && <FontAwesomeIcon size="3x" icon={faChevronLeft} />} 
        </div>
    )

}

export default SliderArrow;