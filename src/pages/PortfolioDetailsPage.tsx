import {useAppSelector} from '../hooks/redux-hooks';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import Slider from 'react-slick';
import SliderArrow from '../components/SliderArrow';
import GalleryTile from '../components/GalleryTile';
import { history } from '../routes/AppRouter';
import {PortfolioItemDetailsProps} from '../interfaces';
import {appDataActions_setReturnState, appDataActions_setAppIsLoading} from '../appData/appDataActions';
import {useAppDispatch} from '../hooks/redux-hooks';


const PortfolioItemDetailsPage:React.FC<PortfolioItemDetailsProps> = ({location}) => {
    const _id = location.pathname.split('/')[2];

    const [galleryMode, setGalleryMode] = useState('slideshow');
    const appLoaded = useAppSelector(state => !state.appData.ui.isLoading)
    const portfolioItem = useAppSelector(state => state.appData.portfolio.find(item => item._id === _id))!
    const portCats = useAppSelector(state => state.appData.categories);
    const returnState = useAppSelector(state => state.appData.ui.returnState)
    const dispatch = useAppDispatch();

    const {previewImgUrl, cso, auxImgs, githubUrl, techSpecs, projectTitle, shortDesc, longDesc, projectUrl, auxImgAspectRatio} = portfolioItem;


    useEffect(() => {
        if(appLoaded) {
            setGalleryMode((prev) => {
                return auxImgs && auxImgs.length === 1 ? 'slideshow' : 'tile';
            })            
        }
//        dispatch(appDataActions_setReturnState(returnState.offsetTop, true))
        window.scrollTo(0, 0);

    }, [appLoaded, auxImgs, dispatch, returnState.offsetTop])


    const handleReturn = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        dispatch(appDataActions_setAppIsLoading(true))
        dispatch(appDataActions_setReturnState(returnState.offsetTop, true))
        e.preventDefault();
        history.push('/');
    }


    const toggleGalleryMode = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        var w = window.innerWidth;
        if(w < 768) {
            return false;
        }

        setGalleryMode((prevState) => {
            if(prevState === 'tile') {
                return 'slideshow';
            }
            return 'tile';
        })

    }


    
        const sliderSettings = {
            dots: false,
            infinite: true,
            speed: 1000,
            ladyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            centerPadding: "60px",
            arrows: true,
            centerMode: false,
            nextArrow: <SliderArrow type='next' />,
            prevArrow: <SliderArrow type='prev' />,

        }


        const projectCats = portCats.filter((portCat) => {
            let inCat = false;
            cso.forEach((csoItem) => {
                if (csoItem.category_id === portCat._id) {
                    inCat = true;
                }
            })
            return inCat;
        })


        const logoStyle = {
            backgroundImage: `url(${previewImgUrl})`
        }


        const tilesClass = galleryMode === 'tile' ? 'Portfolio-Item__Gallery--tiles content--active' : 'Portfolio-Item__Gallery--tiles content--inactive';
        const slideClass = galleryMode === 'slideshow' ? 'Portfolio-Item__Gallery--slideshow content--active' : 'Portfolio-Item__Gallery--slideshow content--inactive';
        
        return (
            <div className="Portfolio-Item hide-on-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="Portfolio-Item__Container section-bkg">
                                <div className="Portfolio-Item__Floating-Back-Btn">
                                    <Link className="btn btn-outline-warning" onClick={handleReturn} to="/">&lt; Back</Link>
                                </div>
                                <div className="Portfolio-Item__Head">
                                    <div className="Portfolio-Item__Logo">
                                        <img src="../dist/images/nothing.png" alt="" />
                                        <div className="Portfolio-Item__Logo--container">
                                            <div className="Portfolio-Item__Logo--img" style={logoStyle}></div>
                                        </div>
                                    </div>
                                    <div className="Portfolio-Item__Summary">
                                        <h1 className="Portfolio-Item__Title text-primary">{projectTitle}</h1>
                                        <h6>{shortDesc}</h6>
                                        <p>&nbsp;</p>

                                        <div className="Portfolio-Item__Subdetails">
                                        {projectUrl && 
                                            <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Website: </div>
                                                <div className="Subdetail_right"><a href={`${projectUrl}`} target="_blank" rel="noreferrer">{projectUrl}</a></div>
                                            </div>                                        
                                        }
                                        {githubUrl && 
                                            <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Github URL: </div>
                                                <div className="Subdetail_right">http://somewebsite.com</div>
                                            </div>                                        
                                        }
                                        {techSpecs && 
                                            <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Technologies Used: </div>
                                                <div className="Subdetail_right">{techSpecs}</div>
                                            </div>                                            
                                        }
                                            <div className="Portfolio-Item__Subdetail">
                                                <div className="Subdetail_left text-primary">Project Categories: </div>
                                                <div className="Subdetail_right">
                                                {projectCats.map((cat, index) => {
                                                        return (<span key={uuid()}>{cat.category}{index !== projectCats.length-1 && ', '}</span>)
                                                    })
                                                }    
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="Portfolio-Item__Content">
                                    {longDesc && 
                                    <div className="Portfolio-Item__LongDesc section-content">
                                        <h4 className="text-primary Portfolio-Item__Subtitle">About This Project</h4>
                                        {longDesc}
                                    </div>
                                    }

                                    <div className="Portfolio-Item__Gallery section-content">
                                        <div className="Portfolio-Item__Gallery-Heading">
                                            <h4 className="float-left text-primary Portfolio-Item__Subtitle">Project Gallery</h4>
                                            {(galleryMode === 'slideshow' && auxImgs && auxImgs.length > 1) &&
                                                <Link to="#" className="float-right" onClick={toggleGalleryMode}>Tile View</Link>
                                            }     

                                            {(galleryMode === 'tile' && auxImgs && auxImgs.length > 1) &&
                                                <Link to="#" className="float-right" onClick={toggleGalleryMode}>Slideshow View</Link>
                                            }                                    

                                        </div>
                                        <div className={tilesClass}>
                                        {galleryMode === 'tile' && 
                                        <div className="Portfolio-Item__Gallery-Imgs">
                                            {auxImgs.map((img, idx) => {
                                                return (
                                                <GalleryTile 
                                                    key={idx}
                                                    handleClick={toggleGalleryMode}
                                                    src={img.auxImgUrl}
                                                    idx={idx}
                                                    auxImgAspectRatio={auxImgAspectRatio}
                                                />)
                                            })}

                                            </div>
                                        }
                                        </div>
                                        <div className={slideClass}>
                                            {galleryMode === 'slideshow' &&
                                                <Slider ref={slider => slider} {...sliderSettings}>
                                                {auxImgs.map((item) => {
                                                    return (
                                                        <img key={uuid()} src={item.auxImgUrl} alt="" />
                                                    )
                                                })}
                                                </Slider>                                  
                                        
                                            }
                                        </div>
                                    </div>                                    
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row Portfolio-Item__Bottom-Back-Btn">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <Link className="btn btn-outline-warning" onClick={handleReturn} to="/">Back To Porfolio</Link>
                        </div>
                    </div>
                </div>  
            </div>
        )

}

export default PortfolioItemDetailsPage;