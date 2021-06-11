import {useAppSelector, useAppDispatch} from '../hooks/redux-hooks';
import {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import Slider from 'react-slick';
import SliderArrow from '../components/SliderArrow';
import GalleryTile from '../components/GalleryTile';
import { history } from '../routes/AppRouter';
import {PortfolioItemDetailsProps} from '../interfaces';
//import {appDataActions_setReturnOffsetTop} from '../appData/appDataActions';

const PortfolioItemDetailsPage:React.FC<PortfolioItemDetailsProps> = ({location}) => {
    const _id = location.pathname.split('/')[2];

    const [galleryMode, setGalleryMode] = useState('slideshow');



    
    const appLoaded = useAppSelector(state => !state.appData.ui.isLoading)
    const portfolioItem = useAppSelector(state => state.appData.portfolio.find(item => item._id === _id))!
    // const slider = useRef();
    // const dispatch = useAppDispatch();

    const {previewImgUrl, cso, auxImgs, githubUrl, techSpecs, projectTitle, shortDesc, longDesc, projectUrl, auxImgAspectRatio} = portfolioItem;


    

    useEffect(() => {
        if(appLoaded) {
            setGalleryMode((prev) => {
                return auxImgs && auxImgs.length === 1 ? 'slideshow' : 'tile';

            })            
        }
    }, [appLoaded, auxImgs])


    const handleReturn = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        // this is to makesure that the home page scroller only works
        // once when componentDidMount() fires on the home page load.
        
        // TODO: figure out WTF this is all about ...
        //localStorage.setItem('returnhome','1');

        history.push('/');
    }


    const toggleGalleryMode = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        var w = window.innerWidth;
        //var h = window.innerHeight;
        if(w < 768) {
            return false;
        }

        setGalleryMode((prevState) => {
            if(prevState === 'tile') {
                return 'slideshow';
            }
            return 'tile';
        })

    
        // TODO: figure out how to reimplment this

        // setTimeout(() => {
        //     if(galleryMode === 'slideshow' && slider) {
        //         slider.slickGoTo(idx);
        //     }
        // }, 500)


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

        const projectCats = () => {
            let aryCats:any = [];

            // remove the slash from the end of the last category or it'll look weird
            //aryCats[aryCats.length-1] = aryCats[aryCats.length-1].replace(' / ', '');
            return 'cats go here';
            // {aryCats.map((cat) => {
            //     return (
            //         <span key={uuid()}>{cat}</span>
            //         )
            // })}
        }


        const logoStyle = {
            backgroundImage: `url(${previewImgUrl})`
        }

        
        // portCategories.forEach((cat) => {
        //     const idx = cso.findIndex((portcat) => {
        //         return portcat+'' === cat.id+''
        //     })
        //     if(idx !== -1) {

        //         aryCats.push(`${cat.name} / `)
        //     }
        // })


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

                                        </div>
                                    </div>
                                </div>

                                <div className="Portfolio-Item__Content">
                                    <div className="Portfolio-Item__Portcats">
                                        <span  className="text-primary">Project Categories: </span>
                                        {projectCats()}
                                    </div>
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