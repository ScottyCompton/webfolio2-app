import ImageWithPreloader from './ImageWithPreloader';
import { Link } from 'react-router-dom';
import { history } from '../routes/AppRouter';
import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import {PortRailItemProps} from '../interfaces';
import {useState} from 'react';
import {appDataActions_setReturnState} from '../appData/appDataActions';

const PortRailItem:React.FC<PortRailItemProps> = ({_id, slideIdx, slideIndexSetter}) => {

    const data = useAppSelector(state => state.appData.portfolio.find(item => item._id === _id))!
    const {projectTitle, shortDesc, previewImgUrl, techSpecs, projectUrl, auxImgs} = data;    
    const hasAuxImgs = auxImgs && auxImgs.length > 0;
    const hasDetails = hasAuxImgs || projectUrl;
    const [infoClass, setInfoClass] = useState('');
    const dispatch = useAppDispatch();



    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setInfoClass('railItem__info--expanded');
    }

    const handleMouseLeave = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setInfoClass('');
    }

    const handleLinkClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        //e.target.blur();
    }

    const handleViewDetailsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // instead of a regular link back, i want the portfolio item
        // page to scroll to the top of the page when it lands there

        e.preventDefault();
        const top = window.scrollY;
        window.scrollTo(0,0);
        slideIndexSetter(slideIdx);
        
        dispatch(appDataActions_setReturnState(top, false));
        history.push(`/portfolio/${_id}`);
    }
    

	const handleCloseWindowClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
		setInfoClass('');
	}


        return (
            <span>
                <div className="railItem__outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="railItem__inner">
                        <div onClick={handleMouseEnter}>
                            <ImageWithPreloader 
                                src={previewImgUrl} 
                                className="railitem__img-preloader" />
                        </div>
                        <div className={`railItem__info ${infoClass}`}>
                            <h5>{projectTitle}</h5>
                            <div className={`railItem__info--short-desc ${infoClass}`}>
                                {shortDesc}
                                {techSpecs && <div><br />Technologies Used:<br /> {techSpecs}</div>}
                                {hasDetails &&
                                    <div className="railItem__info--buttons">
                                            {projectUrl && <span className="show-for-mobile"><a className="btn btn-outline-warning" rel="noreferrer" onClick={handleLinkClick} href={projectUrl} target="_blank">Visit Website</a></span>}
                                            {hasAuxImgs && <span className="show-for-mobile"><Link className="btn btn-outline-warning" data-id={_id} onClick={handleViewDetailsClick} to={`/portfolio/${_id}`}>View Details</Link></span>}
                                            {projectUrl && <span className="show-for-desktop"><a className="btn btn-outline-warning btn-sm" rel="noreferrer" onClick={handleLinkClick} href={projectUrl} target="_blank">Visit Website</a></span>}
                                            {hasAuxImgs && <span className="show-for-desktop"><Link className="btn btn-outline-warning btn-sm" data-id={_id} onClick={handleViewDetailsClick} to={`/portfolio/${_id}`}>View Details</Link></span>}
                                    </div>                            
                                }
                                <div className="show-for-mobile railitem_close-button">
                                    <span><Link to="#close" className="btn btn-outline-warning" onClick={handleCloseWindowClick}> Close </Link></span>
                                </div>
                             </div>    
                        </div>
                    </div>
                </div>
            </span>
        )        
    
}


export default PortRailItem;

